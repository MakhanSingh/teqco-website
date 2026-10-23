// Headless WordPress that holds the site's content. Override with CMS_URL / NEXT_PUBLIC_CMS_URL
// once cms.teqco.com.au is live.
import cms from '@/data/cms.json';

export const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || process.env.CMS_URL || 'https://wordpress-667011-6746624.cloudwaysapps.com').replace(/\/$/, '');
export const CMS_CONTENT_URL = `${CMS_URL}/wp-json/teqco/v1/content`;

// Enquiries go to the "Website enquiry" Contact Form 7 form; Flamingo keeps a copy of each one.
export const CF7_FORM_ID = cms.settings.cf7_form_id || 66;
export const CF7_FEEDBACK_URL = `${CMS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;
export const CF7_UNIT_TAG = `wpcf7-f${CF7_FORM_ID}-o1`;
