const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { style: 'short' });

const getRelativeTimeString = (d1, d2 = new Date()) => {
  const elapsed = d1 - d2;
  for (const unit in units)
    if (Math.abs(elapsed) > units[unit] || unit == 'second')
      return rtf.format(Math.round(elapsed / units[unit]), unit);
};

const formatForInput = (d) => {
  const year = d.getFullYear();
  const pad = (n) => n.toString().padStart(2, '0');

  const month = pad(d.getMonth() + 1);
  const date = pad(d.getDate());

  return `${year}-${month}-${date}`;
};

const formatToLocale = (d) => {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export { getRelativeTimeString, formatForInput, formatToLocale };
