export default function TopHeader() {
  return (
    <div className="bg-blue-900 w-full px-4 md:px-12 xl:px-52 py-6 z-50">
      <div className="bg-white/5 px-6 md:px-12 py-2 backdrop-blur-md border border-white/30 flex flex-col md:flex-row items-center justify-between rounded-full gap-2">
        <ul>
          <li className="flex flex-row text-white items-center gap-2 text-xs md:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="18"
              height="18"
              fill="currentColor"
              className="text-white"
              style={{ marginRight: "4px" }}
            >
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.472.868 4.847 2.463 6.829L4.15 28.108A1 1 0 0 0 5.333 29.85l6.165-2.243A12.903 12.903 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 22.6c-1.708 0-3.389-.457-4.846-1.322l-.345-.203-3.663 1.333 1.304-3.521-.225-.357C6.219 17.915 5.6 16.488 5.6 15c0-5.74 4.66-10.4 10.4-10.4S26.4 9.26 26.4 15 21.74 25.6 16 25.6Zm5.205-6.273c-.286-.143-1.706-.841-1.97-.937-.264-.096-.456-.143-.647.142-.191.286-.74.937-.91 1.13-.17.191-.336.215-.622.072-.286-.143-1.21-.446-2.304-1.424-.852-.759-1.428-1.698-1.598-1.984-.167-.286-.018-.441.126-.581.129-.127.286-.331.429-.497.143-.167.191-.286.286-.477.096-.191.048-.358-.024-.5-.073-.143-.647-1.548-.887-2.125-.234-.563-.472-.486-.648-.494-.167-.007-.358-.008-.549-.008s-.5.072-.763.358c-.262.286-1 .978-1 2.382 0 1.406 1.021 2.764 1.163 2.954.143.191 2.012 3.082 4.882 4.199.684.236 1.217.377 1.633.481.686.175 1.309.151 1.8.092.55-.066 1.706-.699 1.947-1.374.239-.674.239-1.252.167-1.374-.071-.122-.262-.191-.548-.334Z" />
            </svg>
            <span className="font-semibold">Atendimento Premium</span>{" "}
            <b className="text-xs md:text-sm">0800 282 2444</b>
          </li>
        </ul>

        <ul className="flex flex-row items-center gap-6">
          <li>
            <button
              type="button"
              id="city-open"
              className="flex items-center gap-2 text-white hover:text-[#70f306] duration-300 cursor-pointer"
              aria-haspopup="dialog"
              aria-controls="city-modal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-xs md:text-sm font-bold">Tietê</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/80"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id="city-modal"
              className="fixed inset-0 z-[60] m-0 hidden items-center justify-center bg-black/60 px-4"
            >
              <div className="w-full max-w-xl rounded-2xl bg-[#071b27] shadow-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-bold text-white mb-5">Selecione sua cidade:</h2>

                <select className="w-full p-3 border border-white/20 bg-white rounded-md text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/10">
                  <option value="">Escolha sua cidade</option>
                  <option value="Tietê">Tietê</option>
                  <option value="Cerquilho">Cerquilho</option>
                </select>

                <div className="mt-6 flex items-center justify-between z-50" id="popup">
                  <button
                    type="button"
                    data-city-close
                    className="bg-slate-200 px-6 py-3 rounded-md text-black font-medium hover:bg-slate-300 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    data-city-close
                    className="bg-[#70f306] px-8 py-3 rounded-md text-secondary font-bold hover:opacity-90 transition-opacity"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </li>

          <li className="flex flex-row items-center gap-4">
            <a
              href="https://www.instagram.com/tvactelecom/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#70f306] hover:opacity-80 transition-opacity"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/tvactelecom/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#70f306] hover:opacity-80 transition-opacity"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5v1.9H18l-.5 2.9h-2.6v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function () {
  if (window.__cityModalInit) return;
  window.__cityModalInit = true;

  function block(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    el.classList.add('flex');
  }

  function hide(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    el.classList.remove('flex');
  }

  function init() {
    var openBtn = document.getElementById('city-open');
    var modal = document.getElementById('city-modal');
    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', function () { block('city-modal'); });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) hide('city-modal');
    });

    var closers = modal.querySelectorAll('[data-city-close]');
    closers.forEach(function (btn) {
      btn.addEventListener('click', function () { hide('city-modal'); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide('city-modal');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();`,
        }}
      />
    </div>
  );
}
