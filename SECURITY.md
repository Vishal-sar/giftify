# Security Policy

## Supported Versions

We support security updates for the following versions:

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅ Yes    |

## Reporting Security Vulnerabilities

**Please do not disclose security vulnerabilities publicly.** Instead:

1. **Email**: Send details to the project maintainer
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will:
- Acknowledge receipt within 48 hours
- Provide estimated timeline for fix
- Notify you when the patch is released

## Security Best Practices

### Environment Variables
- Never commit `.env.local` or `.env.production.local`
- Use Vercel's environment variable settings for production
- Rotate API keys regularly
- Use different keys for dev/staging/production

### Database Security
- Enable Row-Level Security (RLS) policies in Supabase
- Restrict API key permissions to only necessary tables
- Use service role keys only server-side
- Audit access logs regularly

### Authentication
- Use strong, unique passwords
- Enable 2FA on all accounts
- Keep authentication libraries updated
- Review active sessions regularly

### Dependencies
- Run `npm audit` regularly
- Update dependencies as patches become available
- Subscribe to security advisories for key packages
- Review changelogs before major updates

### Code Security
- Never log sensitive data (passwords, tokens, API keys)
- Validate all user input server-side
- Use HTTPS for all external requests
- Implement rate limiting on API endpoints
- Set appropriate CORS policies

### Infrastructure
- Use Vercel's built-in security features
- Enable HTTPS everywhere
- Set secure headers (CSP, X-Frame-Options, etc.)
- Monitor logs for suspicious activity
- Keep Node.js runtime updated

## Third-Party Dependencies Security

This project depends on:
- **@supabase/supabase-js**: Official Supabase client
- **razorpay**: Payment gateway integration
- **nodemailer**: Email service
- **framer-motion**: Animation library
- **tailwindcss**: CSS framework

All dependencies are maintained and monitored for security issues.

## Compliance

This project handles:
- User personal information (names, emails, addresses)
- Payment information (processed by Razorpay)
- Order history and preferences

We comply with:
- GDPR for EU users
- Data protection best practices
- PCI DSS for payment processing

## Security Headers

The application implements:
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Incident Response

In case of a security incident:
1. We will identify and contain the issue
2. Assess the impact
3. Notify affected users
4. Implement fixes
5. Publish post-incident report

## Contact

**Security Inquiries**: Contact the project maintainer  
**Latest Update**: July 12, 2026  
**Version**: 1.0.0
