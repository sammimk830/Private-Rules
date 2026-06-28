function FindProxyForURL(url, host) {
    // 預設本地代理通道
    var PROXY = "SOCKS5 127.0.0.1:7891";
    var DEFAULT = "DIRECT";

    host = host.toLowerCase();

    // 1. 關鍵字匹配（只要包含這些關鍵字，一律走代理）
    if (
        host.indexOf("openai") !== -1 ||
        host.indexOf("chatgpt") !== -1 ||
        host.indexOf("anthropic") !== -1 ||
        host.indexOf("claude") !== -1
    ) {
        return PROXY;
    }

    // 2. 針對香港封鎖的 AI 核心網域與登入驗證元件進行精準匹配
    if (
        // --- OpenAI / ChatGPT 核心與其附屬驗證 ---
        shExpMatch(host, "ai.com") || shExpMatch(host, "*.ai.com") ||
        shExpMatch(host, "oaistatic.com") || shExpMatch(host, "*.oaistatic.com") ||
        shExpMatch(host, "oaiusercontent.com") || shExpMatch(host, "*.oaiusercontent.com") ||
        shExpMatch(host, "auth0.com") || shExpMatch(host, "*.auth0.com") || // 影響 ChatGPT 登入授權
        shExpMatch(host, "client-api.arkoselabs.com") || shExpMatch(host, "*.client-api.arkoselabs.com") || // 人類驗證碼
        shExpMatch(host, "stripe.com") || shExpMatch(host, "*.stripe.com") || // Plus 付款頁面分流
        shExpMatch(host, "intercom.io") || shExpMatch(host, "*.intercom.io") ||
        shExpMatch(host, "intercomcdn.com") || shExpMatch(host, "*.intercomcdn.com") ||
        shExpMatch(host, "api.statsig.com") || shExpMatch(host, "*.api.statsig.com") ||

        // --- Anthropic / Claude 核心與驗證 ---
        shExpMatch(host, "anthropic.com") || shExpMatch(host, "*.anthropic.com") ||
        shExpMatch(host, "claude.ai") || shExpMatch(host, "*.claude.ai") ||

        // --- 其他目前在香港封鎖/不開放的熱門 AI ---
        shExpMatch(host, "perplexity.ai") || shExpMatch(host, "*.perplexity.ai")
    ) {
        return PROXY;
    }

    // 其餘所有可以正常在香港連線的網站（如 Google Gemini、Copilot、普通網頁）一律直連
    return DEFAULT;
}
