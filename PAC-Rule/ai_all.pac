function FindProxyForURL(url, host) {
    // 預設本地代理通道
    var PROXY = "SOCKS5 127.0.0.1:7891";
    var DEFAULT = "DIRECT";

    host = host.toLowerCase();

    // 1. 所有目標 IP 屬於 192.168.88.0/24，一律經 Proxy
    // 包括直接輸入 IP，以及域名解析後落入此網段
    if (isInNet(host, "192.168.88.0", "255.255.255.0")) {
        return PROXY;
    }

    // 2. 關鍵字匹配：只要 Host 包含以下關鍵字，一律經 Proxy
    if (
        host.indexOf("openai") !== -1 ||
        host.indexOf("chatgpt") !== -1 ||
        host.indexOf("anthropic") !== -1 ||
        host.indexOf("claude") !== -1
    ) {
        return PROXY;
    }

    // 3. AI 核心網域、登入驗證及相關服務
    if (
        // OpenAI / ChatGPT
        shExpMatch(host, "ai.com") ||
        shExpMatch(host, "*.ai.com") ||
        shExpMatch(host, "oaistatic.com") ||
        shExpMatch(host, "*.oaistatic.com") ||
        shExpMatch(host, "oaiusercontent.com") ||
        shExpMatch(host, "*.oaiusercontent.com") ||

        // 登入授權
        shExpMatch(host, "auth0.com") ||
        shExpMatch(host, "*.auth0.com") ||

        // 人類驗證
        shExpMatch(host, "client-api.arkoselabs.com") ||
        shExpMatch(host, "*.client-api.arkoselabs.com") ||

        // 付款
        shExpMatch(host, "stripe.com") ||
        shExpMatch(host, "*.stripe.com") ||

        // 客戶服務及統計
        shExpMatch(host, "intercom.io") ||
        shExpMatch(host, "*.intercom.io") ||
        shExpMatch(host, "intercomcdn.com") ||
        shExpMatch(host, "*.intercomcdn.com") ||
        shExpMatch(host, "api.statsig.com") ||
        shExpMatch(host, "*.api.statsig.com") ||

        // Anthropic / Claude
        shExpMatch(host, "anthropic.com") ||
        shExpMatch(host, "*.anthropic.com") ||
        shExpMatch(host, "claude.ai") ||
        shExpMatch(host, "*.claude.ai") ||

        // Perplexity
        shExpMatch(host, "perplexity.ai") ||
        shExpMatch(host, "*.perplexity.ai")
    ) {
        return PROXY;
    }

    // 其餘網站全部直連
    return DEFAULT;
}
