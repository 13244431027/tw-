(function(ext) {
    // 清理函数
    ext._shutdown = function() {};
    
    // 扩展状态
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    // 生成设备ID的函数
    ext.getComputerID = function() {
        // 尝试从localStorage获取已有的ID
        let deviceId = localStorage.getItem('turbowarp_device_id');
        
        if (!deviceId) {
            // 如果不存在，生成新的设备ID
            deviceId = generateDeviceID();
            localStorage.setItem('turbowarp_device_id', deviceId);
        }
        
        return deviceId;
    };
    
    // 生成设备ID的辅助函数
    function generateDeviceID() {
        const components = [];
        
        // 获取浏览器信息
        components.push(navigator.userAgent);
        components.push(navigator.platform);
        components.push(navigator.hardwareConcurrency || 'unknown');
        components.push(navigator.deviceMemory || 'unknown');
        
        // 获取屏幕信息
        components.push(screen.width);
        components.push(screen.height);
        components.push(screen.colorDepth);
        
        // 获取时区和语言
        components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
        components.push(navigator.language);
        
        // 获取WebGL信息
        const webglInfo = getWebGLInfo();
        components.push(webglInfo.renderer);
        components.push(webglInfo.vendor);
        
        // 生成哈希值
        const combined = components.join('|');
        return hashCode(combined);
    }
    
    // 获取WebGL信息
    function getWebGLInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    return {
                        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
                    };
                }
            }
        } catch (e) {
            console.error('WebGL error:', e);
        }
        
        return {renderer: 'unknown', vendor: 'unknown'};
    }
    
    // 简单的哈希函数
    function hashCode(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        
        return 'device-' + Math.abs(hash).toString(16).substring(0, 12);
    }
    
    // 积木描述符
    var descriptor = {
        blocks: [
            ['r', 'computer id', 'getComputerID']
        ],
        url: 'https://example.com/computer-id-extension'
    };
    
    // 注册扩展
    ScratchExtensions.register('Computer ID', descriptor, ext);
})({});