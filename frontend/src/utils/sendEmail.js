import emailjs from '@emailjs/browser';

export const sendEmailNotification = (toEmail, subject, message) => {
  return emailjs.send(
    'service_shbrpf6',
    'template_l1uf5ht',
    {
      user_email: toEmail,
      subject,
      message,
    },
    'nTg0KLD5lZ_i7FmM-'
  );
};
