{
  function FindProxyForURL(url, host) {
      return "SOCKS5 http://192.168.1.5:1080; SOCKS 192.168.1.5:1080";
  }
}
