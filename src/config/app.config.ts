interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Astrologer'],
  tenantName: 'Company',
  applicationName: 'Milkyway Astrology',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View user information',
    'View company information',
    'View birthchart information',
    'View chat messages',
  ],
  ownerAbilities: [
    'Manage users',
    'Manage companies',
    'Manage birthcharts',
    'Manage readings',
    'Manage chats',
    'Manage astrologers',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/ddbbd007-70ef-4849-ac9c-234e07f6e752',
};
