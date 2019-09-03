export const getEnvironment = () => process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';

  export  const getApiUrl = () => {
    switch (getEnvironment()) {
      case 'production':
        return 'http://api.additivasia.io';
      case 'stage':
        return 'https://<your-domain-name>';
      case 'development':
      default:
         return 'http://api.additivasia.io';
    }
  };

