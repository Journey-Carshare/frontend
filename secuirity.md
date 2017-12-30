- Server Access
- DNS Secuirty
- Frontend Access
- API Access
- Backend Access
- Data Secuirity

### Server Access
- Remote Service Login
  - 2FA
- Remote Server Login
  - SSH Keys [1]
  - Disable password login
- Securing the server
  - Firewall [1]
  - Service Auditing [1]
  - Intrustion Detection [1]
    - Tripwire
    - Aide
  - Unattended Upgrades [2]
  - Server Update Policy
  - Fail2Ban
  - Disable ipv6

### DNS Secuirty

### Frontend Access
- Enforce HTTPS [1]
  - certbot
- Cookies
  - Enforce HTTP only
  - Enforce HTTPS (secure flag)
- Subresource Integrity [3]
  

### API Access
- Enforce HTTPS
  - certbot
- Rate Limits
- Authentication
  - CAPTCHA
- Password Policy
  - Between 12-4096 Characters
  - Can contain any characters
  - Encourage Password Managers
  - zxcvbn score of 3 out of 4 [4] [5]

### PHP considerations [3]
- PHP version 7.2 Minimum
- PHP version 2.3 Early 2019
- Package Management
  - Composer
  - PHPUnit
  - PHP-CS-Fixer
  - roave/security-advisories (checks that application doesnt depend on any known vulnerable packages)
  - vimeo/psalm (security static analysis)
- HTTPS
  - Content-Security-Policy
  - Expect-CT
  - Referrer-Policy
  - Strict-Transport-Policy
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection
- Subresource Integrity
- DB Interactions
  - EasyDB
- Attacks
  - XSS
    - Always Escape on output, never on input
  - CSRF
    - Use HTTPS
    - Basic Challenge-Response Authentication
      - Hidden Form attribute
      - Populate with Token
      - Verify Token was submitted and matches the expected
      - Anti-CSRF
      
  
- Resistance to CSRF

### Backend Access
- Limit Access

### Data Secuirity
- Hashing Algorithms
  - bcrypt
  - Hash Persistant Login Cookie
- Handling and Storage of Data

[1] - https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers
[2] - https://www.digitalocean.com/community/questions/best-practices-for-hardening-new-sever-in-2017
[3] - https://paragonie.com/blog/2017/12/2018-guide-building-secure-php-software#after-fold
[4] - https://github.com/bjeavons/zxcvbn-php
[5] - https://paragonie.com/blog/2015/04/secure-authentication-php-with-long-term-persistence
