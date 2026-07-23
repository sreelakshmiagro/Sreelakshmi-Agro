"use client";

export default function GoogleMap() {
  return (
    <iframe
      title="Corporate Location Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15682.02534591469!2d76.195232!3d10.220123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7e6dbd08734f1%3A0x1d5c2be6cbfa848d!2sKodungallur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
    />
  );
}
