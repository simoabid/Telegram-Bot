import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);

// Cache the Python command to avoid repeated detection
let cachedPythonCommand = null;

/**
 * Detects the correct Python command for the current platform
 * Tests multiple common Python commands and returns the first one that has pornhub-api installed
 * @returns {Promise<string>} The Python command to use
 * @throws {Error} If no suitable Python installation is found
 */
export async function getPythonCommand() {
    // Return cached result if available
    if (cachedPythonCommand) {
        return cachedPythonCommand;
    }
    
    const platform = os.platform();
    const commands = platform === 'win32' ? ['python', 'python3', 'py'] : ['python3', 'python'];
    
    // Add fallback to the original working path for Windows
    if (platform === 'win32') {
        commands.push('C:\\Users\\pc\\AppData\\Local\\Programs\\Python\\Python313\\python.exe');
    }
    
    for (const cmd of commands) {
        try {
            // First, check if the command exists
            await execAsync(`${cmd} --version`);
            console.log(`🐍 Testing Python command: ${cmd}`);
            
            // Try to import pornhub_api
            try {
                const { stdout } = await execAsync(`${cmd} -c "import pornhub_api; print('OK')"`);
                if (stdout.trim() === 'OK') {
                    console.log(`✅ Found Python with pornhub-api: ${cmd}`);
                    cachedPythonCommand = cmd;
                    return cmd;
                }
            } catch (importError) {
                console.log(`⚠️ ${cmd} exists but pornhub-api not found, trying to install...`);
                
                // Try to install pornhub-api
                try {
                    await execAsync(`${cmd} -m pip install pornhub-api`);
                    console.log(`✅ Installed pornhub-api for ${cmd}`);
                    
                    // Test again after installation
                    const { stdout } = await execAsync(`${cmd} -c "import pornhub_api; print('OK')"`);
                    if (stdout.trim() === 'OK') {
                        console.log(`✅ ${cmd} now has pornhub-api`);
                        cachedPythonCommand = cmd;
                        return cmd;
                    }
                } catch (installError) {
                    console.log(`❌ Failed to install pornhub-api for ${cmd}:`, installError.message);
                    continue;
                }
            }
        } catch (error) {
            // This Python command doesn't work, try the next one
            console.log(`❌ ${cmd} not found or not working`);
            continue;
        }
    }
    
    // No suitable Python found
    const errorMsg = `Python with pornhub-api not found. Please install: pip install pornhub-api\nTried commands: ${commands.join(', ')}`;
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
}

/**
 * Executes a Python script with the correct Python command
 * @param {string} scriptPath - Path to the Python script
 * @param {string[]} args - Arguments to pass to the script
 * @returns {Promise<{stdout: string, stderr: string}>} The execution result
 */
export async function executePythonScript(scriptPath, args = []) {
    const pythonCmd = await getPythonCommand();
    const command = `${pythonCmd} "${scriptPath}" ${args.map(arg => `"${arg}"`).join(' ')}`;
    
    console.log(`🐍 Executing: ${command}`);
    return await execAsync(command);
}

/**
 * Clears the cached Python command (useful for testing or if environment changes)
 */
export function clearPythonCache() {
    cachedPythonCommand = null;
} 