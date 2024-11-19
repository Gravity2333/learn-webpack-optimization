(() => {
    const disablePaths = []
    // disablePaths.push('/configuration/objects/ip-label');
    // disablePaths.push('/analysis/security/mail-login');
    // disablePaths.push('/configuration/safety-analysis/mail-login')
    // disablePaths.push('/security')
    // disablePaths.push('/configuration/safety-analysis')
    disablePaths.push('/configuration/safety-analysis/threat-intelligence')
    window.disablePath = disablePaths;
    window.HAMode = 'off_ha'
    // window.redirectUrl = '/analysis/performance/list/network'
  })()
  