const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const requireFields = (data, fields) => fields.filter((f) => !data?.[f]);

module.exports = { isEmail, isUrl, requireFields };
