#!/usr/bin/env python3
"""
Pornhub Bot Integration Script
Provides comprehensive Pornhub API functionality for the bot
"""

import sys
import json
from typing import Dict, List, Any, Optional
from pornhub_api import PornhubApi

class PornhubBotAPI:
    def __init__(self):
        """Initialize the Pornhub API"""
        self.api = PornhubApi()
    
    def search_videos(self, query: str, **kwargs) -> Dict[str, Any]:
        """Search for videos"""
        try:
            results = self.api.search.search(query, **kwargs)
            
            videos = []
            for video in results.videos:
                videos.append({
                    'title': video.title,
                    'duration': video.duration,
                    'views': video.views,
                    'video_id': video.video_id,
                    'url': str(video.url),
                    'thumbnail': str(video.default_thumb),
                    'rating': video.rating,
                    'ratings_count': video.ratings,
                    'publish_date': str(video.publish_date),
                    'segment': video.segment,
                    'tags': [tag.tag_name for tag in video.tags] if hasattr(video, 'tags') and video.tags else [],
                    'categories': [cat.category for cat in video.categories] if hasattr(video, 'categories') and video.categories else [],
                    'pornstars': [star.pornstar_name for star in video.pornstars] if hasattr(video, 'pornstars') and video.pornstars else []
                })
            
            return {
                'success': True,
                'query': query,
                'total_count': results.size() if hasattr(results, 'size') else len(videos),
                'page': kwargs.get('page', 1),
                'videos': videos
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'query': query
            }
    
    def get_video_by_id(self, video_id: str, thumbsize: str = "medium") -> Dict[str, Any]:
        """Get video details by ID"""
        try:
            video = self.api.video.get_by_id(video_id, thumbsize=thumbsize)
            
            return {
                'success': True,
                'video': {
                    'title': video.title,
                    'duration': video.duration,
                    'views': video.views,
                    'video_id': video.video_id,
                    'url': str(video.url),
                    'thumbnail': str(video.default_thumb),
                    'rating': video.rating,
                    'ratings_count': video.ratings,
                    'publish_date': str(video.publish_date),
                    'segment': video.segment,
                    'tags': [tag.tag_name for tag in video.tags] if hasattr(video, 'tags') and video.tags else [],
                    'categories': [cat.category for cat in video.categories] if hasattr(video, 'categories') and video.categories else [],
                    'pornstars': [star.pornstar_name for star in video.pornstars] if hasattr(video, 'pornstars') and video.pornstars else [],
                    'thumbs': [str(thumb.src) for thumb in video.thumbs] if hasattr(video, 'thumbs') and video.thumbs else []
                }
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'video_id': video_id
            }
    
    def check_video_active(self, video_id: str) -> Dict[str, Any]:
        """Check if video is still active/available"""
        try:
            result = self.api.video.is_active(video_id)
            
            return {
                'success': True,
                'video_id': video_id,
                'is_active': result.is_active == "1",
                'status': "Active" if result.is_active == "1" else "Inactive"
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'video_id': video_id
            }
    
    def get_categories(self) -> Dict[str, Any]:
        """Get all available video categories"""
        try:
            categories = self.api.video.categories()
            
            return {
                'success': True,
                'categories': [cat.category for cat in categories.categories],
                'total_count': len(categories.categories)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_tags(self, letter: str) -> Dict[str, Any]:
        """Get tags starting with specific letter"""
        try:
            if len(letter) != 1:
                raise ValueError("Letter must be a single character")
            
            tags = self.api.video.tags(letter)
            
            return {
                'success': True,
                'letter': letter,
                'tags': tags.tags,  # Tags are already strings
                'total_count': len(tags.tags)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'letter': letter
            }
    
    def get_stars(self, detailed: bool = False) -> Dict[str, Any]:
        """Get all pornstars"""
        try:
            if detailed:
                stars = self.api.stars.all_detailed()
                star_data = [{
                    'star_name': star.star.star_name,
                    'star_url': str(star.star.star_url) if hasattr(star.star, 'star_url') else None,
                    'star_thumb': str(star.star.star_thumb) if hasattr(star.star, 'star_thumb') else None
                } for star in stars.stars]
            else:
                stars = self.api.stars.all()
                star_data = [star.star.star_name for star in stars.stars]
            
            return {
                'success': True,
                'detailed': detailed,
                'stars': star_data,
                'total_count': len(star_data)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_trending_videos(self, period: str = "weekly", limit: int = 10) -> Dict[str, Any]:
        """Get trending videos by period"""
        try:
            results = self.api.search.search(
                "",  # Empty query for trending
                ordering="mostviewed",
                period=period,
                page=1
            )
            
            videos = []
            for video in results.videos[:limit]:
                videos.append({
                    'title': video.title,
                    'duration': video.duration,
                    'views': video.views,
                    'video_id': video.video_id,
                    'url': str(video.url),
                    'thumbnail': str(video.default_thumb),
                    'rating': video.rating
                })
            
            return {
                'success': True,
                'period': period,
                'videos': videos,
                'total_count': len(videos)
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'period': period
            }

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) < 2:
        print(json.dumps({
            'success': False,
            'error': 'No command provided. Use: python pornhub-bot.py <command> [args...]'
        }))
        sys.exit(1)
    
    command = sys.argv[1].lower()
    args = sys.argv[2:] if len(sys.argv) > 2 else []
    
    api = PornhubBotAPI()
    
    try:
        if command == "search":
            if not args:
                raise ValueError("Search query required")
            query = " ".join(args)
            result = api.search_videos(query, page=1, ordering="mostviewed")
        
        elif command == "video":
            if not args:
                raise ValueError("Video ID required")
            video_id = args[0]
            thumbsize = args[1] if len(args) > 1 else "medium"
            result = api.get_video_by_id(video_id, thumbsize)
        
        elif command == "active":
            if not args:
                raise ValueError("Video ID required")
            video_id = args[0]
            result = api.check_video_active(video_id)
        
        elif command == "categories":
            result = api.get_categories()
        
        elif command == "tags":
            if not args:
                raise ValueError("Letter required")
            letter = args[0]
            result = api.get_tags(letter)
        
        elif command == "stars":
            detailed = len(args) > 0 and args[0].lower() == "detailed"
            result = api.get_stars(detailed)
        
        elif command == "trending":
            period = args[0] if args else "weekly"
            limit = int(args[1]) if len(args) > 1 else 10
            result = api.get_trending_videos(period, limit)
        
        else:
            result = {
                'success': False,
                'error': f'Unknown command: {command}',
                'available_commands': [
                    'search <query>',
                    'video <video_id> [thumbsize]',
                    'active <video_id>',
                    'categories',
                    'tags <letter>',
                    'stars [detailed]',
                    'trending [period] [limit]'
                ]
            }
        
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e),
            'command': command,
            'args': args
        }))

if __name__ == "__main__":
    main() 