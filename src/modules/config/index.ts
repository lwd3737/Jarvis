export interface Config {
  port: number;
  secret: string;
  openai: {
    apiKey: string;
    model: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}

export function configure() {
  const {
    PORT,
    SECRET_KEY,
    OPENAI_API_KEY,
    GPT_MODEL,
    FIRE_BASE_API_KEY,
    FIRE_BASE_AUTH_DOMAIN,
    FIRE_BASE_PROJECT_ID,
    FIRE_BASE_STORAGE_BUCKET,
    FIRE_BASE_MESSAGING_SENDER_ID,
    FIRE_BASE_APP_ID,
    FIRE_BASE_MEASUREMENT_ID,
  } = process.env;
  if (!PORT) throwErrorIfEnvNotFound('PORT');
  if (!SECRET_KEY) throwErrorIfEnvNotFound('SECERT_KEY');
  if (!OPENAI_API_KEY) throwErrorIfEnvNotFound('OPENAI_API_KEY');
  if (!GPT_MODEL) throwErrorIfEnvNotFound('GPT_MODEL');
  if (!FIRE_BASE_API_KEY) throwErrorIfEnvNotFound('FIRE_BASE_API_KEY');
  if (!FIRE_BASE_AUTH_DOMAIN) throwErrorIfEnvNotFound('FIRE_BASE_AUTH_DOMAIN');
  if (!FIRE_BASE_PROJECT_ID) throwErrorIfEnvNotFound('FIRE_BASE_PROJECT_ID');
  if (!FIRE_BASE_STORAGE_BUCKET)
    throwErrorIfEnvNotFound('FIRE_BASE_STORAGE_BUCKET');
  if (!FIRE_BASE_MESSAGING_SENDER_ID)
    throwErrorIfEnvNotFound('FIRE_BASE_MESSAGING_SENDER_ID');
  if (!FIRE_BASE_APP_ID) throwErrorIfEnvNotFound('FIRE_BASE_APP_ID');
  if (!FIRE_BASE_MEASUREMENT_ID)
    throwErrorIfEnvNotFound('FIRE_BASE_MEASUREMENT_ID');

  return {
    port: parseInt(PORT!),
    secret: SECRET_KEY,
    openai: {
      apiKey: OPENAI_API_KEY,
      model: GPT_MODEL,
    },
    firebase: {
      apiKey: FIRE_BASE_API_KEY,
      authDomain: FIRE_BASE_AUTH_DOMAIN,
      projectId: FIRE_BASE_PROJECT_ID,
      storageBucket: FIRE_BASE_STORAGE_BUCKET,
      messagingSenderId: FIRE_BASE_MESSAGING_SENDER_ID,
      appId: FIRE_BASE_APP_ID,
      measurementId: FIRE_BASE_MEASUREMENT_ID,
    },
  };
}

function throwErrorIfEnvNotFound(envName: string): void {
  throw new Error(`Env(${envName}) not found`);
}
