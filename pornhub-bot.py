#!/usr/bin/env python3
"""
Pornhub Bot API - Command Line Interface
Provides CLI access to pornhub-api functionality for Node.js bot integration
"""

import sys
import json
import argparse
from pornhub_api import PornhubApi

class PornhubBotAPI:
    def __init__(self):
        """Initialize the Pornhub API client"""
        try:
            self.api = PornhubApi()
        except Exception as e:
            print(json.dumps({"success": False, "error": f"Failed to initialize API: {str(e)}"}))
            sys.exit(1)
    
    def search_videos(self, query, ordering="mostviewed", period="weekly", category=None, tags=None, page=1, thumbsize="medium"):
        """
        Advanced search for videos with multiple filter options
        
        Args:
            query (str): Search query
            ordering (str): Sort order - featured, newest, mostviewed, rating
            period (str): Time period - weekly, monthly, alltime (for mostviewed/rating)
            category (str): Category filter (optional)
            tags (list): List of tags to filter by (optional)
            page (int): Page number
            thumbsize (str): Thumbnail size - small, medium, large, small_hd, medium_hd, large_hd
        """
        try:
            # Parse tags if provided as comma-separated string
            if tags and isinstance(tags, str):
                tags = [tag.strip() for tag in tags.split(',') if tag.strip()]
            
            # Build search parameters
            search_params = {
                'q': query,
                'page': int(page),
                'ordering': ordering,
                'thumbsize': thumbsize
            }
            
            # Add optional parameters
            if period and ordering in ['mostviewed', 'rating']:
                search_params['period'] = period
            
            if category:
                search_params['category'] = category
                
            if tags:
                search_params['tags'] = tags
            
            # Execute search
            results = self.api.search.search(**search_params)
            
            # Format results
            videos = []
            for video in results.videos:
                video_data = {
                    'title': video.title,
                    'duration': video.duration,
                    'views': video.views,
                    'video_id': video.video_id,
                    'rating': float(video.rating) if video.rating else 0,
                    'ratings': video.ratings,
                    'url': str(video.url),
                    'thumb': str(video.thumb),
                    'publish_date': str(video.publish_date) if hasattr(video, 'publish_date') else None,
                    'segment': getattr(video, 'segment', ''),
                    'tags': [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(video, 'tags', [])],
                    'categories': [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(video, 'categories', [])],
                    'pornstars': [star.pornstar_name if hasattr(star, 'pornstar_name') else str(star) for star in getattr(video, 'pornstars', [])]
                }
                videos.append(video_data)
            
            return {
                'success': True,
                'videos': videos,
                'total_count': getattr(results, 'count', len(videos)),
                'page': int(page),
                'search_params': search_params
            }
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def search_basic(self, query):
        """Basic search for backward compatibility"""
        return self.search_videos(query)
    
    def get_video_info(self, video_id, thumbsize="medium"):
        """Get detailed video information"""
        try:
            result = self.api.video.get_by_id(video_id, thumbsize=thumbsize)
            video = result.video  # Access the nested video object
            
            video_data = {
                'title': video.title,
                'duration': video.duration,
                'views': video.views,
                'video_id': video.video_id,
                'rating': float(video.rating) if video.rating else 0,
                'ratings': video.ratings,
                'url': str(video.url),
                'thumb': str(video.thumb),
                'default_thumb': str(video.default_thumb) if hasattr(video, 'default_thumb') else None,
                'publish_date': str(video.publish_date) if hasattr(video, 'publish_date') else None,
                'segment': getattr(video, 'segment', ''),
                'tags': [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(video, 'tags', [])],
                'categories': [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(video, 'categories', [])],
                'pornstars': [star.pornstar_name if hasattr(star, 'pornstar_name') else str(star) for star in getattr(video, 'pornstars', [])]
            }
            
            return {'success': True, 'video': video_data}
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_enhanced_video_info(self, video_id, thumbsize="large"):
        """Get enhanced video information with additional details"""
        try:
            result = self.api.video.get_by_id(video_id, thumbsize=thumbsize)
            video = result.video  # Access the nested video object
            
            # Enhanced video data with more details
            video_data = {
                'basic_info': {
                    'title': video.title,
                    'video_id': video.video_id,
                    'duration': video.duration,
                    'url': str(video.url),
                    'segment': getattr(video, 'segment', ''),
                    'publish_date': str(video.publish_date) if hasattr(video, 'publish_date') else None
                },
                'statistics': {
                    'views': video.views,
                    'rating': float(video.rating) if video.rating else 0,
                    'ratings_count': video.ratings,
                    'rating_percentage': round(float(video.rating), 1) if video.rating else 0,
                    'likes_estimate': int(video.ratings * (float(video.rating) / 100)) if video.rating and video.ratings else 0
                },
                'thumbnails': {
                    'current': str(video.thumb),
                    'default': str(video.default_thumb) if hasattr(video, 'default_thumb') else None,
                    'size': thumbsize,
                    'available_sizes': ['small', 'medium', 'large', 'small_hd', 'medium_hd', 'large_hd'],
                    'thumbnail_count': len(getattr(video, 'thumbs', []))
                },
                'content': {
                    'tags': [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(video, 'tags', [])],
                    'categories': [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(video, 'categories', [])],
                    'pornstars': [star.pornstar_name if hasattr(star, 'pornstar_name') else str(star) for star in getattr(video, 'pornstars', [])],
                    'tag_count': len(getattr(video, 'tags', [])),
                    'category_count': len(getattr(video, 'categories', [])),
                    'performer_count': len(getattr(video, 'pornstars', []))
                },
                'metadata': {
                    'has_performers': len(getattr(video, 'pornstars', [])) > 0,
                    'is_verified': 'verified' in [cat.category.lower() if hasattr(cat, 'category') else str(cat).lower() for cat in getattr(video, 'categories', [])],
                    'content_type': getattr(video, 'segment', 'unknown'),
                    'duration_minutes': self._parse_duration_to_minutes(video.duration)
                }
            }
            
            return {'success': True, 'video': video_data, 'enhanced': True}
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_video_stats(self, video_id):
        """Get video statistics and analytics"""
        try:
            result = self.api.video.get_by_id(video_id)
            video = result.video  # Access the nested video object
            
            # Calculate various statistics
            rating = float(video.rating) if video.rating else 0
            ratings_count = video.ratings or 0
            views = video.views or 0
            
            # Estimate engagement metrics
            rating_percentage = rating
            likes_estimate = int(ratings_count * (rating / 100)) if rating > 0 else 0
            dislikes_estimate = ratings_count - likes_estimate if ratings_count > likes_estimate else 0
            
            # Calculate popularity score (custom algorithm)
            duration_minutes = self._parse_duration_to_minutes(video.duration)
            popularity_score = self._calculate_popularity_score(views, rating, ratings_count, duration_minutes)
            
            stats_data = {
                'video_id': video_id,
                'title': video.title,
                'engagement': {
                    'views': views,
                    'views_formatted': self._format_number(views),
                    'rating': rating,
                    'ratings_count': ratings_count,
                    'likes_estimate': likes_estimate,
                    'dislikes_estimate': dislikes_estimate,
                    'engagement_ratio': round((ratings_count / views * 1000), 2) if views > 0 else 0
                },
                'content_metrics': {
                    'duration': video.duration,
                    'duration_minutes': duration_minutes,
                    'tags_count': len(getattr(video, 'tags', [])),
                    'categories_count': len(getattr(video, 'categories', [])),
                    'performers_count': len(getattr(video, 'pornstars', []))
                },
                'popularity': {
                    'score': popularity_score,
                    'rating_grade': self._get_rating_grade(rating),
                    'view_tier': self._get_view_tier(views),
                    'engagement_level': self._get_engagement_level(ratings_count, views)
                },
                'publish_info': {
                    'date': str(video.publish_date) if hasattr(video, 'publish_date') else None,
                    'segment': getattr(video, 'segment', 'unknown')
                }
            }
            
            return {'success': True, 'stats': stats_data}
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_related_videos(self, video_id, limit=10):
        """Get related video suggestions based on tags and categories"""
        try:
            # First get the original video to extract tags and categories
            result = self.api.video.get_by_id(video_id)
            original_video = result.video  # Access the nested video object
            
            # Extract tags and categories for related search
            tags = [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(original_video, 'tags', [])]
            categories = [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(original_video, 'categories', [])]
            
            related_videos = []
            
            # Search by tags (first few tags)
            if tags:
                search_tags = tags[:3]  # Use first 3 tags
                tag_results = self.api.search.search(
                    q="",
                    tags=search_tags,
                    ordering="mostviewed",
                    page=1
                )
                
                for video in tag_results.videos[:limit//2]:
                    if video.video_id != video_id:  # Exclude original video
                        related_videos.append({
                            'title': video.title,
                            'video_id': video.video_id,
                            'duration': video.duration,
                            'views': video.views,
                            'rating': float(video.rating) if video.rating else 0,
                            'url': str(video.url),
                            'thumb': str(video.thumb),
                            'relation_type': 'tags',
                            'matching_tags': search_tags,
                            'tags': [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(video, 'tags', [])],
                            'categories': [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(video, 'categories', [])]
                        })
            
            # Search by category if we need more results
            if len(related_videos) < limit and categories:
                category_results = self.api.search.search(
                    q="",
                    category=categories[0],
                    ordering="rating",
                    page=1
                )
                
                for video in category_results.videos[:limit-len(related_videos)]:
                    if video.video_id != video_id and not any(v['video_id'] == video.video_id for v in related_videos):
                        related_videos.append({
                            'title': video.title,
                            'video_id': video.video_id,
                            'duration': video.duration,
                            'views': video.views,
                            'rating': float(video.rating) if video.rating else 0,
                            'url': str(video.url),
                            'thumb': str(video.thumb),
                            'relation_type': 'category',
                            'matching_category': categories[0],
                            'tags': [tag.tag_name if hasattr(tag, 'tag_name') else str(tag) for tag in getattr(video, 'tags', [])],
                            'categories': [cat.category if hasattr(cat, 'category') else str(cat) for cat in getattr(video, 'categories', [])]
                        })
            
            return {
                'success': True,
                'original_video': {
                    'title': original_video.title,
                    'video_id': video_id,
                    'tags': tags,
                    'categories': categories
                },
                'related_videos': related_videos,
                'count': len(related_videos),
                'search_criteria': {
                    'tags_used': tags[:3] if tags else [],
                    'category_used': categories[0] if categories else None
                }
            }
            
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def check_video_active(self, video_id):
        """Check if video is active"""
        try:
            is_active = self.api.video.is_active(video_id)
            return {'success': True, 'active': is_active, 'video_id': video_id}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_categories(self):
        """Get all available categories"""
        try:
            categories = self.api.video.categories()
            category_list = [cat.category if hasattr(cat, 'category') else str(cat) for cat in categories.categories]
            return {'success': True, 'categories': category_list, 'count': len(category_list)}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_tags(self, letter):
        """Get tags starting with specified letter"""
        try:
            tags = self.api.video.tags(letter)
            # tags.tags is a list of strings in version 0.2.0
            return {'success': True, 'tags': tags.tags, 'letter': letter, 'count': len(tags.tags)}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_stars(self, detailed=False):
        """Get pornstar information"""
        try:
            if detailed:
                stars = self.api.stars.all_detailed()
                star_list = []
                for star in stars.stars:
                    # Access nested star object
                    star_data = {
                        'star_name': star.star.star_name,
                        'star_url': str(star.star.star_url),
                        'star_thumb': str(star.star.star_thumb) if hasattr(star.star, 'star_thumb') else None
                    }
                    star_list.append(star_data)
            else:
                stars = self.api.stars.all()
                star_list = []
                for star in stars.stars:
                    star_data = {
                        'star_name': star.star.star_name,
                        'star_url': str(star.star.star_url)
                    }
                    star_list.append(star_data)
            
            return {'success': True, 'stars': star_list, 'count': len(star_list), 'detailed': detailed}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    # Helper methods for enhanced features
    def _parse_duration_to_minutes(self, duration):
        """Parse duration string to minutes"""
        try:
            if ':' in duration:
                parts = duration.split(':')
                if len(parts) == 2:  # MM:SS
                    return int(parts[0]) + round(int(parts[1]) / 60, 1)
                elif len(parts) == 3:  # HH:MM:SS
                    return int(parts[0]) * 60 + int(parts[1]) + round(int(parts[2]) / 60, 1)
            return 0
        except:
            return 0
    
    def _format_number(self, num):
        """Format large numbers for display"""
        if num >= 1000000:
            return f"{num/1000000:.1f}M"
        elif num >= 1000:
            return f"{num/1000:.1f}K"
        return str(num)
    
    def _calculate_popularity_score(self, views, rating, ratings_count, duration):
        """Calculate a popularity score based on multiple factors"""
        if views == 0:
            return 0
        
        # Normalize factors
        view_score = min(views / 1000000, 10)  # Max 10 points for views
        rating_score = (rating / 100) * 5  # Max 5 points for rating
        engagement_score = min(ratings_count / 10000, 3)  # Max 3 points for engagement
        duration_score = min(duration / 30, 2)  # Max 2 points for duration
        
        total_score = view_score + rating_score + engagement_score + duration_score
        return round(total_score, 1)
    
    def _get_rating_grade(self, rating):
        """Get letter grade for rating"""
        if rating >= 90: return "A+"
        elif rating >= 80: return "A"
        elif rating >= 70: return "B"
        elif rating >= 60: return "C"
        elif rating >= 50: return "D"
        else: return "F"
    
    def _get_view_tier(self, views):
        """Get view tier classification"""
        if views >= 50000000: return "Viral"
        elif views >= 10000000: return "Mega Hit"
        elif views >= 1000000: return "Popular"
        elif views >= 100000: return "Trending"
        elif views >= 10000: return "Rising"
        else: return "New"
    
    def _get_engagement_level(self, ratings_count, views):
        """Get engagement level"""
        if views == 0:
            return "No Data"
        
        engagement_ratio = ratings_count / views * 1000
        if engagement_ratio >= 10: return "Very High"
        elif engagement_ratio >= 5: return "High"
        elif engagement_ratio >= 2: return "Medium"
        elif engagement_ratio >= 1: return "Low"
        else: return "Very Low"

def main():
    """Main CLI interface"""
    parser = argparse.ArgumentParser(description='Pornhub Bot API CLI')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Basic search (backward compatibility)
    search_parser = subparsers.add_parser('search', help='Search for videos (basic)')
    search_parser.add_argument('query', help='Search query')
    
    # Advanced search
    adv_search_parser = subparsers.add_parser('advanced_search', help='Advanced search with filters')
    adv_search_parser.add_argument('query', help='Search query')
    adv_search_parser.add_argument('--ordering', default='mostviewed', 
                                   choices=['featured', 'newest', 'mostviewed', 'rating'],
                                   help='Sort order')
    adv_search_parser.add_argument('--period', default='weekly',
                                   choices=['weekly', 'monthly', 'alltime'],
                                   help='Time period (for mostviewed/rating)')
    adv_search_parser.add_argument('--category', help='Category filter')
    adv_search_parser.add_argument('--tags', help='Comma-separated list of tags')
    adv_search_parser.add_argument('--page', type=int, default=1, help='Page number')
    adv_search_parser.add_argument('--thumbsize', default='medium',
                                   choices=['small', 'medium', 'large', 'small_hd', 'medium_hd', 'large_hd'],
                                   help='Thumbnail size')
    
    # Video info
    info_parser = subparsers.add_parser('info', help='Get video information')
    info_parser.add_argument('video_id', help='Video ID')
    info_parser.add_argument('--thumbsize', default='medium',
                             choices=['small', 'medium', 'large', 'small_hd', 'medium_hd', 'large_hd'],
                             help='Thumbnail size')
    
    # Enhanced video info
    enhanced_info_parser = subparsers.add_parser('enhanced_info', help='Get enhanced video information')
    enhanced_info_parser.add_argument('video_id', help='Video ID')
    enhanced_info_parser.add_argument('--thumbsize', default='large',
                                      choices=['small', 'medium', 'large', 'small_hd', 'medium_hd', 'large_hd'],
                                      help='Thumbnail size')
    
    # Video statistics
    stats_parser = subparsers.add_parser('video_stats', help='Get video statistics and analytics')
    stats_parser.add_argument('video_id', help='Video ID')
    
    # Related videos
    related_parser = subparsers.add_parser('related_videos', help='Get related video suggestions')
    related_parser.add_argument('video_id', help='Video ID')
    related_parser.add_argument('--limit', type=int, default=10, help='Number of related videos')
    
    # Video active check
    active_parser = subparsers.add_parser('active', help='Check if video is active')
    active_parser.add_argument('video_id', help='Video ID')
    
    # Categories
    subparsers.add_parser('categories', help='Get all categories')
    
    # Tags
    tags_parser = subparsers.add_parser('tags', help='Get tags by letter')
    tags_parser.add_argument('letter', help='Starting letter (a-z)')
    
    # Stars
    stars_parser = subparsers.add_parser('stars', help='Get pornstar information')
    stars_parser.add_argument('--detailed', action='store_true', help='Get detailed information')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    # Initialize API
    bot_api = PornhubBotAPI()
    
    # Execute command
    if args.command == 'search':
        result = bot_api.search_basic(args.query)
    elif args.command == 'advanced_search':
        result = bot_api.search_videos(
            args.query, 
            ordering=args.ordering,
            period=args.period,
            category=args.category,
            tags=args.tags,
            page=args.page,
            thumbsize=args.thumbsize
        )
    elif args.command == 'info':
        result = bot_api.get_video_info(args.video_id, thumbsize=args.thumbsize)
    elif args.command == 'enhanced_info':
        result = bot_api.get_enhanced_video_info(args.video_id, thumbsize=args.thumbsize)
    elif args.command == 'video_stats':
        result = bot_api.get_video_stats(args.video_id)
    elif args.command == 'related_videos':
        result = bot_api.get_related_videos(args.video_id, limit=args.limit)
    elif args.command == 'active':
        result = bot_api.check_video_active(args.video_id)
    elif args.command == 'categories':
        result = bot_api.get_categories()
    elif args.command == 'tags':
        result = bot_api.get_tags(args.letter)
    elif args.command == 'stars':
        result = bot_api.get_stars(detailed=args.detailed)
    else:
        result = {'success': False, 'error': f'Unknown command: {args.command}'}
    
    # Output result as JSON
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main() 