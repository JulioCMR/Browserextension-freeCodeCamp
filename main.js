/* Browser Extension main Javascript File */

let myLeads = []
const inputEl = document.querySelector("#input-el")
const saveButton = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const delButton = document.querySelector("#del-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabButton = document.querySelector("#tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


delButton.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    console.log(myLeads)
    render(myLeads)   
})

saveButton.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""

    let myLeadsStr = JSON.stringify(myLeads)
    
    localStorage.setItem("myLeads", myLeadsStr)
    render(myLeads)        
})

tabButton.addEventListener("click", function(){
    
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        let myLeadsStr = JSON.stringify(myLeads)
        localStorage.setItem("myLeads", myLeadsStr)
        render(myLeads)
    })

})


function render(leads){
    
    let listItems = ""
    for (let i = 0; i < leads.length; i ++) {

        listItems += `
        
        <li>

            <a href="${leads[i]}" target="_blank">${leads[i]}</a>

        </li>
        `
         
    
        // Alternative method (createElement() and append()) ---
        // Create element -
        // let li = document.createElement("li")
        // Set text content -
        // li.textContent = myLeads[i]
        // Append the element to ul -
        // ulEl.append(li)
        
    }
    
    ulEl.innerHTML = listItems
}
