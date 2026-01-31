import axios from 'axios';

interface NetlifyDeploymentConfig {
  siteName: string;
  files: {
    [path: string]: string; // path: content
  };
}

interface NetlifyDeploymentResult {
  success: boolean;
  siteUrl?: string;
  deployUrl?: string;
  siteId?: string;
  error?: string;
}

class NetlifyService {
  private baseUrl = 'https://api.netlify.com/api/v1';
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = import.meta.env.VITE_NETLIFY_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_NETLIFY_CLIENT_SECRET || '';
  }

  /**
   * Get Netlify OAuth URL for authentication
   */
  getAuthUrl(redirectUri: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      state: Math.random().toString(36).substring(7),
    });

    return `https://app.netlify.com/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/oauth/tickets`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw new Error('Failed to authenticate with Netlify');
    }
  }

  /**
   * Create a new Netlify site
   */
  async createSite(accessToken: string, siteName: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/sites`,
        {
          name: siteName,
          custom_domain: null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating Netlify site:', error);
      throw new Error('Failed to create Netlify site');
    }
  }

  /**
   * Deploy files to Netlify site
   */
  async deploySite(
    accessToken: string,
    siteId: string,
    files: { [path: string]: string }
  ): Promise<any> {
    try {
      // Create a zip file or use Netlify's file upload API
      // For simplicity, we'll use the deploy endpoint
      const response = await axios.post(
        `${this.baseUrl}/sites/${siteId}/deploys`,
        {
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error deploying to Netlify:', error);
      throw new Error('Failed to deploy to Netlify');
    }
  }

  /**
   * Complete deployment flow - authenticate, create site, and deploy
   */
  async deployProject(config: NetlifyDeploymentConfig): Promise<NetlifyDeploymentResult> {
    try {
      // Get access token from localStorage (set after OAuth)
      const accessToken = localStorage.getItem('netlify_access_token');

      if (!accessToken) {
        return {
          success: false,
          error: 'Not authenticated with Netlify. Please authenticate first.',
        };
      }

      // Generate unique site name
      const timestamp = Date.now();
      const uniqueSiteName = `${config.siteName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}`;

      // Create site
      const site = await this.createSite(accessToken, uniqueSiteName);

      // Deploy files
      const deployment = await this.deploySite(accessToken, site.id, config.files);

      return {
        success: true,
        siteUrl: site.ssl_url || site.url,
        deployUrl: deployment.deploy_ssl_url || deployment.deploy_url,
        siteId: site.id,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Deployment failed',
      };
    }
  }

  /**
   * Check if user is authenticated with Netlify
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('netlify_access_token');
  }

  /**
   * Store Netlify access token
   */
  storeAccessToken(token: string): void {
    localStorage.setItem('netlify_access_token', token);
  }

  /**
   * Remove Netlify access token (logout)
   */
  logout(): void {
    localStorage.removeItem('netlify_access_token');
  }
}

export const netlifyService = new NetlifyService();
