import APM from 'elastic-apm-node';

APM.start({
  ignoreUrls: [
    '/ready',
    '/health',
    '/startup',
  ],
  active: process.env.ELASTIC_APM_ACTIVE === 'true',
});

APM.addFilter((payload) => payload);

export default APM;