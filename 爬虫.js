(function(Scratch) {
    'use strict';
    
    // 定义扩展类
    class SuperCrawler {
        // 扩展元数据
        getInfo() {
            return {
                id: 'supercrawler',
                name: '超级爬虫',
                color1: '#4B8BBE',
                color2: '#306998',
                color3: '#FFE873',
                blocks: [
                    {
                        opcode: 'fetchUrl',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [url] 的内容',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com'
                            }
                        }
                    },
                    {
                        opcode: 'fetchJson',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 [url] 的JSON数据',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://api.example.com/data'
                            }
                        }
                    },
                    {
                        opcode: 'getStatusCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取状态码'
                    },
                    {
                        opcode: 'getResponseTime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取响应时间(ms)'
                    },
                    {
                        opcode: 'setUserAgent',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置User-Agent为 [agent]',
                        arguments: {
                            agent: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Mozilla/5.0 (compatible; SuperCrawler/1.0)'
                            }
                        }
                    },
                    {
                        opcode: 'setTimeout',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置超时时间为 [timeout] 毫秒',
                        arguments: {
                            timeout: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5000
                            }
                        }
                    },
                    {
                        opcode: 'setHeader',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置请求头 [key] 为 [value]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Accept'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'application/json'
                            }
                        }
                    },
                    {
                        opcode: 'clearHeaders',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清除所有请求头'
                    },
                    {
                        opcode: 'extractElement',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '从HTML中提取 [selector] 的元素',
                        arguments: {
                            selector: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'h1'
                            }
                        }
                    },
                    {
                        opcode: 'extractAllElements',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '从HTML中提取所有 [selector] 的元素',
                        arguments: {
                            selector: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a'
                            }
                        }
                    },
                    {
                        opcode: 'extractAttribute',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '提取 [selector] 的 [attr] 属性',
                        arguments: {
                            selector: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a'
                            },
                            attr: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'href'
                            }
                        }
                    },
                    {
                        opcode: 'extractText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '提取 [selector] 的文本',
                        arguments: {
                            selector: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            }
                        }
                    },
                    {
                        opcode: 'extractAllText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '提取所有 [selector] 的文本',
                        arguments: {
                            selector: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            }
                        }
                    },
                    {
                        opcode: 'getJsonValue',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取JSON路径 [path] 的值',
                        arguments: {
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'data.items[0].name'
                            }
                        }
                    },
                    {
                        opcode: 'getHtmlContent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取HTML内容'
                    },
                    {
                        opcode: 'getJsonContent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取JSON内容'
                    },
                    {
                        opcode: 'getError',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取错误信息'
                    },
                    {
                        opcode: 'resetCrawler',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '重置爬虫状态'
                    },
                    {
                        opcode: 'setProxy',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置代理 [proxyUrl]',
                        arguments: {
                            proxyUrl: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'enableCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '启用缓存'
                    },
                    {
                        opcode: 'disableCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '禁用缓存'
                    },
                    {
                        opcode: 'clearCache',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清除缓存'
                    },
                    {
                        opcode: 'setMaxRedirects',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置最大重定向次数 [count]',
                        arguments: {
                            count: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            }
                        }
                    }
                ]
            };
        }
        
        // 构造函数
        constructor() {
            this.resetState();
            this.cache = new Map();
            this.cacheEnabled = false;
            this.proxyUrl = '';
            this.maxRedirects = 5;
        }
        
        // 重置爬虫状态
        resetState() {
            this.lastResponse = null;
            this.lastHtml = '';
            this.lastJson = null;
            this.lastError = null;
            this.statusCode = 0;
            this.responseTime = 0;
            this.headers = {
                'Accept': 'text/html,application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache'
            };
            this.userAgent = 'Mozilla/5.0 (compatible; SuperCrawler/1.0)';
            this.timeout = 5000; // 默认5秒超时
            this.htmlDoc = null;
        }
        
        // 获取URL内容
        async fetchUrl(args, util) {
            try {
                const url = this._resolveUrl(args.url);
                const cacheKey = `GET:${url}`;
                
                // 检查缓存
                if (this.cacheEnabled && this.cache.has(cacheKey)) {
                    const cached = this.cache.get(cacheKey);
                    this._applyCachedResponse(cached);
                    return '从缓存获取内容';
                }
                
                const startTime = Date.now();
                const response = await this._fetchWithOptions(url);
                this.responseTime = Date.now() - startTime;
                
                this.lastResponse = response;
                this.statusCode = response.status;
                
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    this.lastJson = await response.json();
                    this.lastHtml = '';
                    this.htmlDoc = null;
                } else {
                    this.lastHtml = await response.text();
                    this.lastJson = null;
                    this.htmlDoc = null; // 延迟解析
                }
                
                // 缓存响应
                if (this.cacheEnabled) {
                    this.cache.set(cacheKey, {
                        statusCode: this.statusCode,
                        responseTime: this.responseTime,
                        lastHtml: this.lastHtml,
                        lastJson: this.lastJson,
                        timestamp: Date.now()
                    });
                }
                
                return '内容已获取';
            } catch (error) {
                this._handleError(error);
                return `错误: ${error.message}`;
            }
        }
        
        // 获取JSON数据
        async fetchJson(args, util) {
            try {
                const url = this._resolveUrl(args.url);
                const cacheKey = `GET:${url}`;
                
                // 检查缓存
                if (this.cacheEnabled && this.cache.has(cacheKey)) {
                    const cached = this.cache.get(cacheKey);
                    this._applyCachedResponse(cached);
                    return '从缓存获取JSON';
                }
                
                const startTime = Date.now();
                const response = await this._fetchWithOptions(url);
                this.responseTime = Date.now() - startTime;
                
                this.lastResponse = response;
                this.statusCode = response.status;
                this.lastJson = await response.json();
                this.lastHtml = '';
                this.htmlDoc = null;
                
                // 缓存响应
                if (this.cacheEnabled) {
                    this.cache.set(cacheKey, {
                        statusCode: this.statusCode,
                        responseTime: this.responseTime,
                        lastHtml: '',
                        lastJson: this.lastJson,
                        timestamp: Date.now()
                    });
                }
                
                return 'JSON数据已获取';
            } catch (error) {
                this._handleError(error);
                return `错误: ${error.message}`;
            }
        }
        
        // 内部方法：带选项的fetch请求
        async _fetchWithOptions(url) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);
            
            try {
                const options = {
                    headers: {
                        ...this.headers,
                        'User-Agent': this.userAgent
                    },
                    signal: controller.signal,
                    redirect: 'follow'
                };
                
                // 使用代理
                const targetUrl = this.proxyUrl ? `${this.proxyUrl}?url=${encodeURIComponent(url)}` : url;
                
                const response = await fetch(targetUrl, options);
                
                clearTimeout(timeoutId);
                return response;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        }
        
        // 解析URL（处理相对路径）
        _resolveUrl(url) {
            try {
                // 如果是绝对路径直接返回
                if (/^https?:\/\//i.test(url)) {
                    return url;
                }
                
                // 尝试解析为当前页面相对路径
                if (typeof location !== 'undefined') {
                    return new URL(url, location.href).href;
                }
                
                return url;
            } catch (e) {
                return url;
            }
        }
        
        // 应用缓存响应
        _applyCachedResponse(cached) {
            this.statusCode = cached.statusCode;
            this.responseTime = cached.responseTime;
            this.lastHtml = cached.lastHtml;
            this.lastJson = cached.lastJson;
            this.lastError = null;
            this.htmlDoc = null;
        }
        
        // 处理错误
        _handleError(error) {
            this.lastError = error;
            this.statusCode = 0;
            this.responseTime = 0;
            
            if (error.name === 'AbortError') {
                this.lastError = new Error(`请求超时 (${this.timeout}ms)`);
            } else if (error.message.includes('Failed to fetch')) {
                this.lastError = new Error('网络错误，请检查URL或网络连接');
            }
        }
        
        // 获取状态码
        getStatusCode() {
            return this.statusCode;
        }
        
        // 获取响应时间
        getResponseTime() {
            return this.responseTime;
        }
        
        // 设置User-Agent
        setUserAgent(args) {
            this.userAgent = args.agent;
        }
        
        // 设置超时时间
        setTimeout(args) {
            this.timeout = Math.max(100, args.timeout);
        }
        
        // 设置请求头
        setHeader(args) {
            this.headers[args.key] = args.value;
        }
        
        // 清除所有请求头
        clearHeaders() {
            this.headers = {};
        }
        
        // 设置代理
        setProxy(args) {
            this.proxyUrl = args.proxyUrl || '';
        }
        
        // 启用缓存
        enableCache() {
            this.cacheEnabled = true;
        }
        
        // 禁用缓存
        disableCache() {
            this.cacheEnabled = false;
        }
        
        // 清除缓存
        clearCache() {
            this.cache.clear();
        }
        
        // 设置最大重定向次数
        setMaxRedirects(args) {
            this.maxRedirects = Math.max(0, args.count);
        }
        
        // 延迟解析HTML文档
        _parseHtml() {
            if (!this.htmlDoc && this.lastHtml) {
                try {
                    const parser = new DOMParser();
                    this.htmlDoc = parser.parseFromString(this.lastHtml, 'text/html');
                } catch (error) {
                    console.error('HTML解析错误:', error);
                    this.htmlDoc = null;
                }
            }
            return this.htmlDoc;
        }
        
        // 从HTML中提取元素
        extractElement(args) {
            const doc = this._parseHtml();
            if (!doc) return '无HTML内容';
            
            try {
                const element = doc.querySelector(args.selector);
                if (!element) return '未找到元素';
                return element.outerHTML;
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 从HTML中提取所有匹配元素
        extractAllElements(args) {
            const doc = this._parseHtml();
            if (!doc) return '无HTML内容';
            
            try {
                const elements = doc.querySelectorAll(args.selector);
                if (elements.length === 0) return '未找到元素';
                
                const results = [];
                elements.forEach(el => results.push(el.outerHTML));
                return results.join('\n\n');
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 提取元素属性
        extractAttribute(args) {
            const doc = this._parseHtml();
            if (!doc) return '无HTML内容';
            
            try {
                const element = doc.querySelector(args.selector);
                if (!element) return '未找到元素';
                return element.getAttribute(args.attr) || '属性不存在';
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 提取文本内容
        extractText(args) {
            const doc = this._parseHtml();
            if (!doc) return '无HTML内容';
            
            try {
                const element = doc.querySelector(args.selector);
                if (!element) return '未找到元素';
                return element.textContent || '';
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 提取所有匹配元素的文本
        extractAllText(args) {
            const doc = this._parseHtml();
            if (!doc) return '无HTML内容';
            
            try {
                const elements = doc.querySelectorAll(args.selector);
                if (elements.length === 0) return '未找到元素';
                
                const results = [];
                elements.forEach(el => results.push(el.textContent || ''));
                return results.join('\n');
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 获取JSON路径的值（优化版）
        getJsonValue(args) {
            if (!this.lastJson) return '无JSON数据';
            
            try {
                const path = args.path.trim();
                if (!path) return '路径不能为空';
                
                // 支持复杂的JSON路径
                const evaluatePath = (obj, path) => {
                    const parts = path.split(/\.|\[|\]/).filter(p => p !== '');
                    let current = obj;
                    
                    for (const part of parts) {
                        if (current === null || typeof current !== 'object') {
                            return undefined;
                        }
                        
                        if (Array.isArray(current)) {
                            const index = parseInt(part);
                            if (isNaN(index)) return undefined;
                            current = current[index];
                        } else {
                            current = current[part];
                        }
                        
                        if (current === undefined) return undefined;
                    }
                    
                    return current;
                };
                
                const value = evaluatePath(this.lastJson, path);
                if (value === undefined) return '路径无效';
                
                return typeof value === 'object' ? JSON.stringify(value) : value;
            } catch (error) {
                return `解析错误: ${error.message}`;
            }
        }
        
        // 获取HTML内容
        getHtmlContent() {
            return this.lastHtml || '无HTML内容';
        }
        
        // 获取JSON内容
        getJsonContent() {
            return this.lastJson ? JSON.stringify(this.lastJson, null, 2) : '无JSON内容';
        }
        
        // 获取错误信息
        getError() {
            return this.lastError ? this.lastError.message : '无错误';
        }
        
        // 重置爬虫状态
        resetCrawler() {
            this.resetState();
        }
    }
    
    // 注册扩展
    Scratch.extensions.register(new SuperCrawler());
})(Scratch);