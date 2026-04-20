const WHATSAPP_NUMBER = "447516413026";
const WHATSAPP_MESSAGE = "Hi Albion, I'd like to know more about your nominee director services.";
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe57] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.673.244-1.03 0-.114-.014-.215-.043-.314-.115-.385-1.92-1.07-2.262-1.184Zm-2.97 7.062c-1.476 0-2.92-.4-4.196-1.13l-3.013.97.98-2.9a8.348 8.348 0 0 1-1.27-4.43c0-4.626 3.785-8.39 8.4-8.39 4.61 0 8.39 3.764 8.39 8.39 0 4.62-3.78 8.43-8.29 8.49Zm0-18.55c-5.612 0-10.18 4.567-10.18 10.18 0 1.764.464 3.51 1.34 5.05L5 28.045l6.4-1.66a10.144 10.144 0 0 0 4.74 1.207h.004c5.612 0 10.18-4.566 10.18-10.18 0-2.72-1.06-5.276-2.984-7.2a10.097 10.097 0 0 0-7.2-2.985Z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;
