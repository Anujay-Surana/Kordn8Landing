import { Sparkles } from 'lucide-react';

export default function Policy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <a href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary">Kordn8</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Privacy Policy for KordN8 (CommOS)</h1>
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> November 3, 2025
          </p>

          <h2>Introduction</h2>
          <p>
            KordN8 ("we," "our," or "us") is an AI-powered communication and productivity assistant that helps you manage your digital workspace. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our service.
          </p>

          <h2>Information We Collect</h2>

          <h3>1. Google Account Information</h3>
          <p>When you connect your Google account to KordN8, we access:</p>
          <ul>
            <li><strong>Identity Information</strong>: Your email address, name, and profile picture</li>
            <li><strong>Gmail Data</strong>: Email messages, labels, metadata, and attachments</li>
            <li><strong>Google Drive Files</strong>: Documents, spreadsheets, presentations, and file metadata</li>
            <li><strong>Calendar Events</strong>: Event details, attendees, times, and locations</li>
            <li><strong>Contacts</strong>: Contact names, email addresses, phone numbers, and related information</li>
            <li><strong>Google Sheets</strong>: Spreadsheet content and metadata</li>
            <li><strong>Google Forms</strong>: Form content, structure, and responses</li>
          </ul>

          <h3>2. Communication Data</h3>
          <ul>
            <li><strong>WhatsApp Messages</strong>: Messages you send to and receive from KordN8 via WhatsApp</li>
            <li><strong>Voice Data</strong>: Audio recordings when you use voice features (processed and not permanently stored)</li>
          </ul>

          <h3>3. Usage Information</h3>
          <ul>
            <li><strong>Service Logs</strong>: Interaction logs, feature usage, and error reports</li>
            <li><strong>Device Information</strong>: Browser type, operating system, and IP address</li>
          </ul>

          <h2>How We Use Your Information</h2>

          <h3>Core Functionality</h3>
          <p>We use your information to:</p>
          <ol>
            <li><strong>Provide AI-Powered Assistance</strong>: Process your requests and provide intelligent responses based on your data</li>
            <li><strong>Search and Retrieve Information</strong>: Search across your Gmail, Drive, Calendar, Contacts, Sheets, and Forms</li>
            <li><strong>Task Management</strong>: Create, track, and manage tasks based on your communications</li>
            <li><strong>Meeting Summaries</strong>: Generate summaries and briefs from calendar events</li>
            <li><strong>Email Management</strong>: Read, send, and organize emails on your behalf</li>
            <li><strong>Document Access</strong>: Read and search your Google Drive documents</li>
            <li><strong>Calendar Management</strong>: View and manage your calendar events</li>
            <li><strong>Contact Management</strong>: Access and search your contacts</li>
            <li><strong>Data Analysis</strong>: Analyze spreadsheets and forms to answer your questions</li>
          </ol>

          <h3>AI Processing</h3>
          <ul>
            <li>We use large language models (LLMs) to understand and respond to your requests</li>
            <li>Your data is processed to provide personalized, context-aware assistance</li>
            <li>We build a knowledge graph of your information to improve response accuracy</li>
          </ul>

          <h2>Data Storage and Security</h2>

          <h3>Storage</h3>
          <ul>
            <li><strong>Encrypted Storage</strong>: All authentication tokens are encrypted using AES-256 encryption</li>
            <li><strong>Database</strong>: We use Supabase (PostgreSQL) with Row Level Security (RLS) for data isolation</li>
            <li><strong>Caching</strong>: Temporary caching of search results using Redis (automatically expires)</li>
            <li><strong>Vector Embeddings</strong>: We create encrypted vector embeddings for semantic search</li>
          </ul>

          <h3>Security Measures</h3>
          <ul>
            <li><strong>Encryption in Transit</strong>: All data is transmitted over HTTPS/TLS</li>
            <li><strong>Encryption at Rest</strong>: Database and secrets are encrypted at rest</li>
            <li><strong>Access Controls</strong>: Strict role-based access controls and authentication</li>
            <li><strong>Token Management</strong>: Automatic token refresh and expiration handling</li>
            <li><strong>Downscope Protection</strong>: We prevent accidental reduction of granted permissions</li>
          </ul>

          <h3>Data Location</h3>
          <ul>
            <li><strong>Infrastructure</strong>: AWS (US East region)</li>
            <li><strong>Database</strong>: Supabase cloud infrastructure</li>
            <li><strong>Compliance</strong>: We follow industry-standard security practices</li>
          </ul>

          <h2>Data Sharing and Third Parties</h2>

          <h3>We DO NOT:</h3>
          <ul>
            <li>❌ Sell your personal information to third parties</li>
            <li>❌ Share your data with advertisers</li>
            <li>❌ Use your data to train public AI models</li>
            <li>❌ Access your data without your explicit authorization</li>
          </ul>

          <h3>We DO share data with:</h3>
          <ul>
            <li><strong>Google APIs</strong>: To access your Google services (Gmail, Drive, Calendar, etc.)</li>
            <li><strong>OpenAI/Anthropic</strong>: To process your requests using LLMs (data is not used for training)</li>
            <li><strong>Twilio</strong>: To send and receive WhatsApp messages</li>
            <li><strong>AWS</strong>: For infrastructure and hosting</li>
          </ul>

          <h3>Service Provider Commitments:</h3>
          <ul>
            <li>All third-party services are bound by strict data processing agreements</li>
            <li>Data is only used to provide our service</li>
            <li>No training on user data without explicit consent</li>
          </ul>

          <h2>Your Rights and Controls</h2>

          <h3>Access and Control</h3>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong>: View what data we have collected about you</li>
            <li><strong>Delete</strong>: Request deletion of your account and all associated data</li>
            <li><strong>Export</strong>: Download a copy of your data</li>
            <li><strong>Revoke</strong>: Disconnect your Google account at any time via Google Account settings</li>
            <li><strong>Limit</strong>: Control which Google services you grant access to</li>
          </ul>

          <h3>Revoking Access</h3>
          <p>You can revoke KordN8's access to your Google account at any time:</p>
          <ol>
            <li>Visit <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a></li>
            <li>Find "KordN8" in your connected apps</li>
            <li>Click "Remove Access"</li>
          </ol>
          <p>When you revoke access:</p>
          <ul>
            <li>We immediately stop accessing your Google data</li>
            <li>Your stored authentication tokens are invalidated</li>
            <li>You can request deletion of all stored data</li>
          </ul>

          <h2>Data Retention</h2>
          <ul>
            <li><strong>Active Users</strong>: We retain your data while your account is active</li>
            <li><strong>Inactive Accounts</strong>: Data is automatically deleted after 90 days of inactivity</li>
            <li><strong>Deleted Accounts</strong>: All data is permanently deleted within 30 days of account deletion</li>
            <li><strong>Cached Data</strong>: Temporary cache expires within 1 hour</li>
            <li><strong>Logs</strong>: Service logs are retained for 7 days</li>
          </ul>

          <h2>Google API Services User Data Policy Compliance</h2>
          <p>
            Our use of information received from Google APIs adheres to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>

          <h3>Limited Use Commitment</h3>
          <ul>
            <li>We only use Google user data to provide and improve KordN8's features</li>
            <li>We do not transfer Google user data to others except as necessary to provide our service, comply with law, or as part of a merger/acquisition</li>
            <li>We do not use or transfer Google user data for serving ads, including retargeting, personalized, or interest-based advertising</li>
            <li>
              We do not allow humans to read your data unless:
              <ul>
                <li>You explicitly consent for specific troubleshooting purposes</li>
                <li>It's necessary for security purposes (e.g., investigating abuse)</li>
                <li>Required by law</li>
              </ul>
            </li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            KordN8 is not intended for users under the age of 13. We do not knowingly collect information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us to have it removed.
          </p>

          <h2>California Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act:</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
            <li>Right to deletion of personal information</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>

          <h2>European Privacy Rights (GDPR)</h2>
          <p>If you are in the European Economic Area, you have rights under the General Data Protection Regulation:</p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>
          <p>
            <strong>Legal Basis for Processing</strong>: We process your data based on your consent when you connect your Google account and use our services.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
          <ul>
            <li>Posting the new Privacy Policy on our website</li>
            <li>Sending an email notification to your registered email address</li>
            <li>Notifying you via WhatsApp if you use that service</li>
          </ul>
          <p>Your continued use of KordN8 after changes constitutes acceptance of the updated policy.</p>

          <h2>Contact Us</h2>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices:</p>
          <p>
            <strong>Email</strong>: <a href="mailto:privacy@kordn8.ai">privacy@kordn8.ai</a>
            <br />
            <strong>Support</strong>: <a href="mailto:founders@kordn8.ai">founders@kordn8.ai</a>
          </p>
          <p>For Google API-related privacy concerns:</p>
          <ul>
            <li>
              Review your connected apps:{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                https://myaccount.google.com/permissions
              </a>
            </li>
            <li>
              Google's Privacy Policy:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </a>
            </li>
          </ul>

          <h2>Transparency Report</h2>
          <p>We are committed to transparency. Upon request, we can provide:</p>
          <ul>
            <li>Information about data access requests from authorities</li>
            <li>Statistics on data deletion requests</li>
            <li>Security incident reports (if applicable)</li>
          </ul>

          <h2>Security Incident Response</h2>
          <p>In the event of a data breach:</p>
          <ol>
            <li>We will notify affected users within 72 hours</li>
            <li>We will report to relevant authorities as required by law</li>
            <li>We will provide details about the breach and mitigation steps</li>
            <li>We will offer assistance and resources to affected users</li>
          </ol>

          <h2>Data Processing Agreement</h2>
          <p>For enterprise customers, we offer a Data Processing Agreement (DPA) that includes:</p>
          <ul>
            <li>Standard Contractual Clauses for international data transfers</li>
            <li>Sub-processor list and notification procedures</li>
            <li>Security and audit rights</li>
            <li>Liability and indemnification terms</li>
          </ul>

          <hr />

          <p>
            <strong>Effective Date</strong>: November 3, 2025
          </p>
          <p>
            <strong>Version</strong>: 1.0
          </p>
          <p>By using KordN8, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-muted-foreground border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p>©2025 Continuum Labs, Inc. All rights reserved.</p>
          <span className="hidden sm:inline">•</span>
          <a href="mailto:founders@kordn8.ai" className="hover:text-foreground transition-colors">
            founders@kordn8.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
