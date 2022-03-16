let form = document.getElementById("form");
console.log(form);
let userData = [];
let githubProfile = document.getElementById('githubProfile');

async function fetchUser() {
    let searchInput = document.getElementById("searchInput").value;
    await fetch('https://api.github.com/users/'+searchInput)
    .then((res) => res.json())
    .then((data) => {
        if (data.message) {
            console.log("user profile is not found");
            userData === [];
        } else {
            userData = data;
        }
    });      
}
async function fetchDisplay() {
    await fetchUser();
    let string_date = userData.created_at;
    let date = new Date(string_date);
    async function addHtml() {

        githubProfile.innerHTML = `
        
        <div class="githubUserImg">
        <img src="${userData.avatar_url}" alt="" width="100" height="100" class="githubIcon">
        </div>
        
        <div class="githubUser">
        
        <div class="githubUserLogin">
        
        <div class="githubUserLogin__text">
        <h1 class="githubUsername">${userData.name}</h1>
        <h2 class="githubSubname">@${userData.login}</h2>
        <p class="githubUserdescription">${userData.bio}</p>
        </div>    
        <p class="githubJoindate">Joined ${date.toLocaleDateString()}</p>
        
        </div>
        
        <div class="githubStats">
        
        <div class="githubStats__statsContainer">
        <h3 class="statTitle">Repos</h3>
        <span class="statContent">${userData.public_repos}</span>
        </div>
        
        <div class="githubStats__statsContainer">
        <h3 class="statTitle">Followers</h3>
        <span class="statContent">${userData.followers}</span>
        </div>

                <div class="githubStats__statsContainer">
                    <h3 class="statTitle">Following</h3>
                    <span class="statContent">${userData.following}</span>
                    </div>
                    
                    </div>
                    
                    <div class="links">
                    
                    <div class="linksList">
                    
                    <div class="link">
                    <i class="fa-solid fa-location-dot"></i>
                    <span class="locationText">${userData.location}</span>
                    </div>
                    <div class="link">
                    <i class="fa-brands fa-twitter"></i>
                    <span class="twitterText">${userData.twitter_username}</span>
                    </div>
                    
                    </div>
                    
                    <div class="linksList">
                    
                    <div class="link">
                    <i class="fa-solid fa-link"></i>
                    <a href="#" class="blogText">${userData.blog}</a>
                    </div>
                    
                    <div class="link">
                    <i class="fa-solid fa-house-building"></i>
                    <span class="homeText">${userData.company}</span>
                    </div>
                    
                    </div>

            </div>

        </div>
        
        `
    }
    await addHtml();
    
    function notAvailablecontent() {
        let userDescription = document.querySelector(".githubUserdescription");
        if (userData.bio === null){
            userDescription.innerHTML = "This profile has no bio."
            userDescription.classList.add("opacity");
        }
        
        let locationText = document.querySelector(".locationText");
        let locationImg = document.querySelector(".fa-location-dot");
        let twitterText = document.querySelector(".twitterText");
        let twitterImg = document.querySelector(".fa-twitter");
        let blogText = document.querySelector(".blogText");
        let blogImg = document.querySelector(".fa-link");
        let homeText = document.querySelector(".homeText");
        let homeImg = document.querySelector(".fa-house-building");

        if (userData.location === null) {
            locationText.innerHTML = "Not available";
            locationText.classList.add("opacity");
            locationImg.classList.add("opacity");
        }
        if (userData.twitter_username === null){ 
            twitterText.innerHTML = "Not available";
            twitterText.classList.add("opacity");
            twitterImg.classList.add("opacity");
        }
        if (userData.blog === null) {
            blogText.innerHTML = "Not available";
            blogText.classList.add("opacity");
            blogImg.classList.add("opacity");
        }
        if (userData.company === null) {
            homeText.innerHTML = "Not available";
            homeText.classList.add("opacity");
            homeImg.classList.add("opacity");
        }
    }
    notAvailablecontent();
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchDisplay();
})

