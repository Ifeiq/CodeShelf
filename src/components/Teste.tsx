export default function TopHeader() {
  return (
<<<<<<< HEAD
    <div
      style={{ backgroundColor: "#8fe001", color: "#00238a" }}
      className="py-2 px-10 md:py-2.5 md:px-9 lg:px-20 xl:px-25"
    >
      <div className="w-full mx-auto flex justify-between items-center text-[10px] md:text-xs lg:text-sm font-semibold">
        <div className="flex items-center gap-2 md:gap-5">
          <a
            href="https://wa.me/5571987745515?text=Ol%C3%A1%2C%20Iclick%20Telecom%21%20Vim%20pelo%20site%20e%20queria%20saber%20mais%20sobre%20os%20servi%C3%A7os%20que%20voc%C3%AAs%20oferecem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs gap-2 group hover:text-white transition-colors"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={13}
                height={13}
                style={{ fill: "#00238a" }}
                className="group-hover:fill-white transition-colors max-md:w-[11px] max-md:h-[11px]"
              >
                <g>
                  <path d="M256.064,0h-0.128C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104l98.4-31.456C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z M405.024,361.504c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264C189.888,347.2,141.44,270.752,137.664,265.792c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304c6.176-6.304,16.384-9.184,26.176-9.184c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64c6.176,14.88,21.216,51.616,23.008,55.392c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744c-3.776,4.352-7.36,7.68-11.136,12.352c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616c28.576,25.44,51.744,33.568,60.032,37.024c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496c5.12-7.232,11.584-8.128,18.368-5.568c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736C411.2,329.152,411.2,344.032,405.024,361.504z" />
                </g>
              </svg>
            </span>
            <span className="max-md:hidden">(71) 98774-5515</span>
            <span className="md:hidden text-[9px]">(71) 98774-5515</span>
          </a>
          <span
            className="hidden md:block h-5 w-0.5"
            style={{ background: "#00238a" }}
          ></span>
          <a
            href="tel:7135120907"
            className="hidden md:flex items-center text-xs gap-2 group hover:text-white transition-colors"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 480.56 480.56"
                width={17}
                height={17}
                style={{ fill: "#00238a" }}
                className="group-hover:fill-white transition-colors"
              >
                <g>
                  <path d="M365.354,317.9c-15.7-15.5-35.3-15.5-50.9,0c-11.9,11.8-23.8,23.6-35.5,35.6c-3.2,3.3-5.9,4-9.8,1.8c-7.7-4.2-15.9-7.6-23.3-12.2c-34.5-21.7-63.4-49.6-89-81c-12.7-15.6-24-32.3-31.9-51.1c-1.6-3.8-1.3-6.3,1.8-9.4c11.9-11.5,23.5-23.3,35.2-35.1c16.3-16.4,16.3-35.6-0.1-52.1c-9.3-9.4-18.6-18.6-27.9-28c-9.6-9.6-19.1-19.3-28.8-28.8c-15.7-15.3-35.3-15.3-50.9,0.1c-12,11.8-23.5,23.9-35.7,35.5c-11.3,10.7-17,23.8-18.2,39.1c-1.9,24.9,4.2,48.4,12.8,71.3c17.6,47.4,44.4,89.5,76.9,128.1c43.9,52.2,96.3,93.5,157.6,123.3c27.6,13.4,56.2,23.7,87.3,25.4c21.4,1.2,40-4.2,54.9-20.9c10.2-11.4,21.7-21.8,32.5-32.7c16-16.2,16.1-35.8,0.2-51.8C403.554,355.9,384.454,336.9,365.354,317.9z" />
                  <path d="M346.254,238.2l36.9-6.3c-5.8-33.9-21.8-64.6-46.1-89c-25.7-25.7-58.2-41.9-94-46.9l-5.2,37.1c27.7,3.9,52.9,16.4,72.8,36.3C329.454,188.2,341.754,212,346.254,238.2z" />
                  <path d="M403.954,77.8c-42.6-42.6-96.5-69.5-156-77.8l-5.2,37.1c51.4,7.2,98,30.5,134.8,67.2c34.9,34.9,57.8,79,66.1,127.5l36.9-6.3C470.854,169.3,444.354,118.3,403.954,77.8z" />
                </g>
              </svg>
            </span>
            <span>(71) 3512-0907</span>
          </a>
          <span
            className="hidden md:block h-5 w-0.5"
            style={{ background: "#00238a" }}
          ></span>
          <a
            href="mailto:contato@iclicktelecom.com.br"
            className="hidden md:flex items-center text-xs gap-2 group hover:text-white transition-colors"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={18}
                height={18}
                style={{ fill: "#00238a" }}
                className="group-hover:fill-white transition-colors"
              >
                <g>
                  <path d="M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121C512,114.073,510.297,107.588,507.49,101.721z" />
                </g>
                <g>
                  <path d="M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51C480.412,77.703,473.927,76,467,76z" />
                </g>
                <g>
                  <path d="M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z" />
                </g>
                <g>
                  <path d="M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z" />
                </g>
              </svg>
            </span>
            <span>contato@iclicktelecom.com.br</span>
          </a>
          <span
            className="hidden lg:block h-5 w-0.5"
            style={{ background: "#00238a" }}
          ></span>
          <a
            href="https://wa.me/5571987745515?text=Ol%C3%A1%2C%20Iclick%20Telecom%21%20Preciso%20abrir%20um%20chamado%20para%20suporte%20t%C3%A9cnico.%20Poderiam%20me%20orientar%2C%20por%20favor%3F"
            className="hidden lg:flex items-center text-xs gap-2 group hover:text-white transition-colors"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white"
              >
                <svg
                  version="1.1"
                  id="fi_69890"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 361.014 361.014"
                  xmlSpace="preserve"
                  width={25}
                  height={25}
                  style={{ fill: "#00238a" }}
                  className="group-hover:fill-white transition-colors"
                >
                  <g>
                    <g id="Layer_5_47_">
                      <path d="M331.035,126.94H318.01c-3.563,0-3.682-2.333-3.805-3.494C307.375,59.094,252.77,8.791,186.637,8.791h-12.26c-65.644,0-119.929,49.56-127.409,113.229c-0.191,1.631-0.291,4.92-3.291,4.92H29.978C20.987,126.94,0,136.401,0,184.18v25.075c0,35.436,20.987,43.609,29.978,43.609h43.584c8.991,0,16.347-7.356,16.347-16.347v-93.23c0-8.991-7.356-16.347-16.347-16.347c0,0-2.052-0.18-1.529-3.835c7.192-50.319,50.129-89.313,102.344-89.313h12.26c51.86,0,94.912,38.418,102.2,88.288c0.235,1.608,1.111,4.86-1.385,4.86c-8.991,0-16.347,7.356-16.347,16.347v93.23c0,8.991,7.356,16.347,16.347,16.347h8.184c2.25,0,1.868,1.798,1.667,2.704c-6.667,30.104-21.637,64.256-55.238,64.256h-24.889c-2.54,0-3.167-1.861-3.65-2.743c-4.032-7.367-11.851-12.364-20.841-12.364h-22.933c-13.118,0-23.753,10.634-23.753,23.753c0,13.119,10.635,23.752,23.753,23.752h22.933c9.112,0,17.023-5.132,21.005-12.662c0.348-0.658,0.633-2.026,3.321-2.026h25.054c22.823,0,53.365-11.341,69.259-65.373c1.694-5.758,3.068-11.496,4.187-17.026c0.154-0.761,0.25-2.27,2.625-2.27h12.9c8.991,0,29.978-8.174,29.978-43.609v-25.075C361.013,137.082,340.026,126.94,331.035,126.94z"></path>
                    </g>
                  </g>
                </svg>
              </svg>
            </span>
            <span>Abertura de Chamado</span>
          </a>
          <span
            className="hidden lg:block h-5 w-0.5"
            style={{ background: "#00238a" }}
          ></span>
          <a
            href="https://central.iclicktelecom.com.br/central_assinante_web/login"
            className="hidden lg:flex items-center text-xs gap-1 group hover:text-white transition-colors"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white"
              >
                <svg
                  version="1.1"
                  id="fi_456212"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  width={22}
                  height={22}
                  style={{ fill: "#00238a" }}
                  className="group-hover:fill-white transition-colors"
                >
                  <g>
                    <g>
                      <path d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15C481,444.833,460.745,395.539,423.966,358.195z"></path>
                    </g>
                  </g>
                </svg>
              </svg>
            </span>
            <span>Central do assinante</span>
          </a>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="https://www.facebook.com/Iclickbandalarga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group hover:opacity-80 transition-opacity"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                version="1.1"
                id="fi_20837"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 155.139 155.139"
                width={18}
                height={18}
                style={{ fill: "#00238a" }}
                className="group-hover:fill-white transition-colors max-md:w-[14px] max-md:h-[14px]"
              >
                <path d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452v20.341H37.29v27.585h23.814v70.761H89.584z" />
              </svg>
            </span>
          </a>
          <a
            href="https://www.instagram.com/iclickbandalarga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group hover:opacity-80 transition-opacity"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg
                height={18}
                width={18}
                viewBox="0 0 511 511.9"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_1384031"
                style={{ fill: "#00238a" }}
                className="group-hover:fill-white transition-colors max-md:w-[14px] max-md:h-[14px]"
              >
                <path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0" />
                <path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0" />
                <path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0" />
              </svg>
            </span>
          </a>
        </div>
      </div>
=======
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
              style={{ marginRight: '4px' }}
            >
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.472.868 4.847 2.463 6.829L4.15 28.108A1 1 0 0 0 5.333 29.85l6.165-2.243A12.903 12.903 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 22.6c-1.708 0-3.389-.457-4.846-1.322l-.345-.203-3.663 1.333 1.304-3.521-.225-.357C6.219 17.915 5.6 16.488 5.6 15c0-5.74 4.66-10.4 10.4-10.4S26.4 9.26 26.4 15 21.74 25.6 16 25.6Zm5.205-6.273c-.286-.143-1.706-.841-1.97-.937-.264-.096-.456-.143-.647.142-.191.286-.74.937-.91 1.13-.17.191-.336.215-.622.072-.286-.143-1.21-.446-2.304-1.424-.852-.759-1.428-1.698-1.598-1.984-.167-.286-.018-.441.126-.581.129-.127.286-.331.429-.497.143-.167.191-.286.286-.477.096-.191.048-.358-.024-.5-.073-.143-.647-1.548-.887-2.125-.234-.563-.472-.486-.648-.494-.167-.007-.358-.008-.549-.008s-.5.072-.763.358c-.262.286-1 .978-1 2.382 0 1.406 1.021 2.764 1.163 2.954.143.191 2.012 3.082 4.882 4.199.684.236 1.217.377 1.633.481.686.175 1.309.151 1.8.092.55-.066 1.706-.699 1.947-1.374.239-.674.239-1.252.167-1.374-.071-.122-.262-.191-.548-.334Z"/>
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
>>>>>>> a96f5f0b425717fe8d3f00be370110280c4b2d3c
    </div>
  );
}