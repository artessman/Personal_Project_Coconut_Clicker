// variables 
var playerMoney = 0;
var lifetimeMoney = 0;
var unlockThreshold = 10000;
var milestone = 1000;
var bountifulBlessingMultiplyer = 0;
var lastLuckyBreak = 0;
var thresholdReached = false;
var progressPercentage = 0.0;
var num_clickers = 0;
var num_juicers = 0;
var num_crushers = 0;
var num_jackhammers = 0;
var bountifulBlessing_purchased = false;
var milestoneBooster_purchased = false;
var luckyBreak_count = 0;
var clicker_cost = 10;
var juicer_cost = 50;
var crushers_cost = 150;
var jackhammer_cost = 1000;
var bountifulBlessing_cost = 250000;
var milestoneBooster_cost = 150000;
var luckyBreak_cost = 50000;
var goldenHarvest_cost =  Math.floor(playerMoney*.3);
var goldenHarvestActive = false;
var goldenHarvestMultiplier = 2; // Points multiplier

// coconut element delcairation variable 
var coconut;

function IncrementMoney(coconut) {
    coconut = document.getElementById("coconut");
    coconut.style.transform = 'translateY(-30px)'; // little hop animation
    setTimeout(() => {
        coconut.style.transform = 'translateY(0)'; 
    }, 100); 

    playerMoney += 1;
    lifetimeMoney += 1;
    updateDisplay(); 
}

// checks if milestone has been reached
function checkMilestone(){
    if (playerMoney >= milestone){
        milestone *= 10;
        if (milestoneBooster_purchased){
            playerMoney+= Math.floor(milestone*.15);
            lifetimeMoney+= Math.floor(milestone*.15);
            console.log(Math.floor(milestone*.1));
        }
    }
}
// Buy Upgrade functions 
//implemented a multipier to make game more engageing
function purchaseClicker() {
    if (playerMoney >= clicker_cost) {
        playerMoney -= clicker_cost;
        num_clickers += 1;
        clicker_cost = Math.floor(clicker_cost * 1.3);
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

function purchaseJuicer() {
    if (playerMoney >= juicer_cost) {
        playerMoney -= juicer_cost;
        num_juicers += 1;
        juicer_cost = Math.floor(juicer_cost * 1.3);
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

function purchaseCrusher() {
    if (playerMoney >= crushers_cost) {
        playerMoney -= crushers_cost;
        num_crushers += 1;
        crushers_cost = Math.floor(crushers_cost * 1.3); 
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

function purchaseJackhammer() {
    if (playerMoney >= jackhammer_cost) {
        playerMoney -= jackhammer_cost;
        num_jackhammers += 1;
        jackhammer_cost = Math.floor(jackhammer_cost * 1.3); 
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}
// hidden 
function purchaseBountifulBlessing() {
    if(bountifulBlessing_purchased){
        alert("Already Purchased");
    }
    else if (playerMoney >= bountifulBlessing_cost) {
        playerMoney -= bountifulBlessing_cost;
        bountifulBlessing_purchased = true;
        updateDisplay();
    }
    else {
        alert("Not enough money!");
    }
}

function purchaseMilestoneBooster() {
    if(milestoneBooster_purchased){
        alert("Already Purchased");
    }
    else if (playerMoney >= milestoneBooster_cost) {
        playerMoney -= milestoneBooster_cost;
        milestoneBooster_purchased = true;
        updateDisplay();
    }
    else {
        alert("Not enough money!");
    }
}

function purchaseLuckyBreak() {
    if (playerMoney >= luckyBreak_cost) {
        playerMoney -= luckyBreak_cost;
        luckyBreak_count += 1;
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}
function purchaseGoldenHarvest() {
    if (playerMoney >= goldenHarvest_cost) {
        playerMoney -= goldenHarvest_cost;
        // activate Golden Harvest
        activateGoldenHarvest();
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
}

// Do Upgrade functions 
function ApplyClickerPoints() {
    return (1* num_clickers);
}

function ApplyJuicerPoints() {
    return (5 * num_juicers);
}

function ApplyCrusherPoints() {
    return (15 * num_crushers);
}

function ApplyJackhammerPoints() {
    return (25* num_jackhammers);
}
// hidden
function ApplyBountifulBlessing() {
    if(bountifulBlessing_purchased){
        bountifulBlessingMultiplyer = num_clickers + num_juicers + num_crushers + num_jackhammers;
        return (4* bountifulBlessingMultiplyer);
    }
    else{
        return 0;
    }
}

function ApplyLuckBreak() {
    for (let i = 0; i < luckyBreak_count; luckyBreak_count--) {
        lastLuckyBreak = Math.floor(Math.random() * 100000) + 1;
        playerMoney += lastLuckyBreak;
      } 
}

// golden harvest: set a then second timer for 2x multipler
function activateGoldenHarvest() {
    goldenHarvestActive = true;
    setTimeout(() => {
        goldenHarvestActive = false;
        updateDisplay(); 
    }, 10000); // 10s
}
//updates milestone bar
function updateProgressBar() {
    const progressBar = document.getElementById("myBar");
    const currentMilestone = milestone;
    progressPercentage = ((playerMoney / currentMilestone) * 100).toFixed(2); //rounds to 2 decimal places 
    progressBar.style.width = progressPercentage + "%"; // adjust progress bar accoordingly
}

// Do all Upgrade actions
function ApplyUpgrades() {
    ApplyLuckBreak();
    sumpoints = ApplyClickerPoints()+ApplyJuicerPoints()+ApplyCrusherPoints()+ApplyJackhammerPoints()+ApplyBountifulBlessing();
    if (goldenHarvestActive) { //checks for golden harvest
        playerMoney += (sumpoints * goldenHarvestMultiplier);  
        lifetimeMoney  += (sumpoints * goldenHarvestMultiplier); 
    }
    else{
        playerMoney += sumpoints;
        lifetimeMoney += sumpoints;
    }
    
}
// game 'setInterval' does what is specified on a given interavl, in this case one second
function game() {
    setInterval(() => {
        goldenHarvest_cost =  Math.floor(playerMoney*.1);
        checkMilestone(); // updates when milestone is reached 
        updateProgressBar(); //updates progressbar
        ApplyUpgrades();  // applys upgrade to balance
        updateDisplay(); // updates the values on page  
    }, 1000); // 1000ms or 1s
}
// updates the displays 
function updateDisplay() {
    document.getElementById("scoreDisplay").innerText = playerMoney;
    document.getElementById("lifetimeCoins").innerText = lifetimeMoney;
    document.getElementById("Clicker").innerText = clicker_cost;
    document.getElementById("Juicer").innerText = juicer_cost;
    document.getElementById("Crusher").innerText = crushers_cost;
    document.getElementById("Jackhammer").innerText = jackhammer_cost;
    document.getElementById("ClickerCount").innerText = num_clickers;
    document.getElementById("JuicerCount").innerText = num_juicers;
    document.getElementById("CrusherCount").innerText = num_crushers;
    document.getElementById("JackhammerCount").innerText = num_jackhammers;
    document.getElementById("currentMilestone").innerText = milestone;
    // hidden values
    document.getElementById("bountifulBlessing").innerText = bountifulBlessing_purchased ? "Purchased" : "Not Purchased";
    document.getElementById("bountifulBlessingMul").innerText = bountifulBlessingMultiplyer*4
    document.getElementById("milestoneBooster").innerText = milestoneBooster_purchased ? "Purchased" : "Not Purchased";
    document.getElementById("luckyBreak").innerText = lastLuckyBreak;
    document.getElementById("goldenHarvestActive").innerText = goldenHarvestActive ? "Active" : "Inactive";
    document.getElementById("goldenHarvestCost").innerText = goldenHarvest_cost;
    document.getElementById("barPercentage").innerText = progressPercentage;


  
    // Show/hide super shop and inventory based on player money
    if (playerMoney >= unlockThreshold || thresholdReached == true) { //bool threshold implemented to prevent menu from disappearing 
        thresholdReached = true;
        document.getElementById("superShopTitle").classList.remove("hidden");
        document.getElementById("superShop").classList.remove("hidden");
        document.getElementById("superInventoryTitle").classList.remove("hidden");
        document.getElementById("superInventory").classList.remove("hidden");
    } else {
        document.getElementById("superShopTitle").classList.add("hidden");
        document.getElementById("superShop").classList.add("hidden");
        document.getElementById("superInventoryTitle").classList.add("hidden");
        document.getElementById("superInventory").classList.add("hidden");
    }
}


// start the game
game();
