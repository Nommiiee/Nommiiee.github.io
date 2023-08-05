if (document.title == "Avatar Repo :: HomePage") {
  console.log("No Need For Navigation Panel");
} else {
  const navigationPanel = `<div class="" id="nav">
<nav class="w-full h-screen absolute md:sticky top-0 bg-slate-900 -translate-x-full md:-translate-x-0 transtition-all duration-500  md:h-min"
    id="navigation">
    <div class=" flex flex-col md:flex-row text-white w-full">
        <button
            class="w-full text-center border-2 border-white text-lg font-medium hover:bg-black transtition-all duration-300 text-white p-2 menu-btn md:hidden">
            Close
        </button>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 md:justify-center"
            href="../index.html">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </span>
            <span>Homepage</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 md:justify-center"
            href="./Avatars.html">
            <span class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Avatar</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 md:justify-center"
            href="./Avatar_Original.html">
            <span class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Avatar Original</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 md:justify-center"
            href="./clothes.html">
            <span class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Clothing</span>
        </a>
        <a class="p-4 border-b-2 border-white w-full flex item-center gap-2 hover:bg-amber-500 hover:text-black hover:border-amber-500 font-medium transtition-all duration-500 md:justify-center"
            href="./Clothes_Original.html">
            <span class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </span>
            <span>Clothing Original</span>
        </a>
    </div>
</nav>
<button
    class="w-full border-2 border-white text-lg font-medium hover:bg-black transtition-all duration-300 text-white p-2 menu-btn md:hidden">
    Menu
</button>
</div>`;

  const navContainer = document.getElementById("nav-container");
  navContainer.innerHTML = navigationPanel;
}

if (
  document.title == "Avatar Repo :: HomePage" ||
  document.title == "Avatar Repo :: Clothing Original"
) {
} else {
  const mainSection = document.getElementById("main-section");

  const searchBar = ` <div class="serach py-4 w-full flex items-center justify-center px-4"><div class="w-full"><input class="py-2 px-4 rounded-sm shadow-sm  text-lg font-medium bg-gray-100 text-gray-800 w-full focus:outline-none"
type="text" placeholder="search" oninput="filterAvatars(this.value)"></div></div>`;

  mainSection.innerHTML = searchBar + mainSection.innerHTML;

  function filterAvatars(str) {
    console.log("Filtering Avatars");
    const avatarName = document.querySelectorAll(".productName");
    avatarName.forEach((name) => {
      if (name.textContent.toLowerCase().includes(str.toLowerCase())) {
        name.parentElement.parentElement.parentElement.parentElement.style.display =
          "block";
      } else {
        name.parentElement.parentElement.parentElement.parentElement.style.display =
          "none";
      }
    });
  }
}

const menuBtn = document.querySelectorAll(".menu-btn");
const navigation = document.querySelector("#navigation");

menuBtn.forEach((btn) => {
  console.log("Menu Loaded");
  btn.addEventListener("click", () => {
    navigation.classList.toggle("-translate-x-full");
    console.log("Menu Button Clicked");
  });
});

async function getData(URL) {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
}
