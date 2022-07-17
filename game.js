// Initialize the original table:
window.onload = () => {

var count = 0
  for(i = 0; i < 4; i ++){
    for(j = 0; j < 4 ; j++){
        var elem = document.createElement("div");
        elem.style.backgroundImage = 'url("./images/'+i+''+j+'.jpg")';
        elem.setAttribute("class","non_click_image")
        elem.setAttribute("onClick", 'handle_click('+i+','+j+')');
        elem.setAttribute("id", i+''+j);
        elem.innerHTML = "<h1>"+(count++)+"</h1>"
        document.getElementById("row"+i).appendChild(elem)
    }
    
  }   
  // Set borders on clickable buttons to "red":
  check()
}

var has_moved = false
// Function to switch tiles:
const handle_click = (row, col) => {
    // Put the grid coord back together:
    let id = row+""+col
    let k = document.getElementById(id)
    // Move the pieces if it is a valid move:
    if(k.getAttribute("class") == "clickable_image" ){
        // Disable clicking:
        var diable_clicks = document.getElementsByTagName("body")[0]
        diable_clicks.setAttribute("class", "disable_clicks")
      
        // Swap the photos:
        swap_photos(id)
        
        // Enable clicking:
        setTimeout(() => {
            // If the person shuffled then has_moved = true, thus check for win:
            if(has_moved) check_win()
            // Set borders on new clickable buttons to "red":
            check()
            diable_clicks = document.getElementsByTagName("body")[0]
            diable_clicks.setAttribute("class", "")
        }, 200);
    } 
}

var click_count = 0
// Helper function to swap the tiles:
const swap_photos = (id) => {
    click_count++
    document.getElementById("game_clicks").innerHTML = "<h4>Total Moves: "+click_count+"</h4>"
    // Save elem's attibutes
    const elem = document.getElementById(id)
    const temp_id = elem.id
    const temp_src = elem.style.backgroundImage
    const temp_clicker = elem.getAttribute("onClick")
    const temp_inner_text = elem.innerHTML

    const other = document.getElementById('33')
    // Set elem's attributes to others'
    elem.style.backgroundImage = other.style.backgroundImage
    elem.id = other.id
    elem.setAttribute("onClick", other.getAttribute("onClick"))
    elem.innerHTML = other.innerHTML
    // Set other's attributes to to elem's originals
    other.style.backgroundImage = temp_src
    other.id = temp_id
    other.setAttribute("onClick", temp_clicker)
    other.innerHTML = temp_inner_text
    return 
}

// Function to shuffle the tiles:
var game_time = 0
var actual_game_clock = null
const shuffle = () => {
    var arr = []
    for( i = 0; i < 4; i++){
        var temp = document.getElementById("row"+[i])
        var temp_list = []
        for(j = 0; j < 4; j++){
            arr = [...arr, temp.getElementsByTagName("div")[j]]
        }
    // Indicate the a shuffle has taken place so we can begin checking for wins:
    has_moved = true
    }

    for(i = 0; i < arr.length; i++){ // For each element in arr
        j = (Math.floor(Math.random() * arr.length)) // New random index
        curr_src = arr[i].style.backgroundImage
        curr_id = arr[i].getAttribute("id")
        curr_clicker = arr[i].getAttribute("onClick")
        curr_inner_text = arr[i].innerHTML
       
        arr[i].style.backgroundImage = arr[j].style.backgroundImage
        arr[i].setAttribute("id" ,arr[j].getAttribute("id"))
        arr[i].setAttribute("onClick", arr[j].getAttribute("onClick"))
        arr[i].innerHTML = arr[j].innerHTML

        arr[j].style.backgroundImage = curr_src
        arr[j].setAttribute("id", curr_id)
        arr[j].setAttribute("onClick", curr_clicker)
        arr[j].innerHTML = curr_inner_text
    }


    var audio = document.getElementById("song")
    audio.loop= true
    audio.play()
  
    actual_game_clock = setInterval(() => {
        game_time++
        document.getElementById("game_clock").innerHTML = "<h4>Total Gametime: "+game_time+" seconds</h4>"
    }, 1000);
    // Set borders on clickable buttons to "red":
    check()
}


// Function sets red border on tiles that can be clicked:
const check = () => {
    var arr = []
    try{
        for( i = 0; i < 4; i++){
            var temp = document.getElementById("row"+[i])
            
            var temp_list = []
            for(j = 0; j < 4; j++){
                temp_list = [...temp_list, temp.getElementsByTagName("div")[j]]
            }
            arr = [...arr, temp_list]
        }
        // Reset all the old images back to default
        for( i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                arr[i][j].setAttribute("class","non_click_image")
            }
        }
        // Set the border on clickable images:
        for( i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                if(i==0){
                    if(j==0){
                        if(arr[i][j].id == '33'){
                            arr[i][j+1].setAttribute("class","clickable_image")
                            arr[i+1][j].setAttribute("class","clickable_image")
                        }
                    }
                    else if(j==3){
                        if(arr[i][j].id == '33'){
                            arr[i][j-1].setAttribute("class","clickable_image")
                            arr[i+1][j].setAttribute("class","clickable_image")
                        }
                    }
                    else if (arr[i][j].id == '33'){
                        arr[i+1][j].setAttribute("class","clickable_image")
                        arr[i][j+1].setAttribute("class","clickable_image")
                        arr[i][j-1].setAttribute("class","clickable_image")
                    }
                }
                else if(i==3){
                    if(j==0){
                        if(arr[i][j].id == '33'){
                            arr[i][j+1].setAttribute("class","clickable_image")
                            arr[i-1][j].setAttribute("class","clickable_image")
                        }
                    }
                    else if(j==3){
                        if(arr[i][j].id == '33'){
                            arr[i][j-1].setAttribute("class","clickable_image")
                            arr[i-1][j].setAttribute("class","clickable_image")
                        }
                    }
                    else if (arr[i][j].id == '33'){
                        arr[i-1][j].setAttribute("class","clickable_image")
                        arr[i][j+1].setAttribute("class","clickable_image")
                        arr[i][j-1].setAttribute("class","clickable_image")
                    }
                }
                else if(j == 3 && arr[i][j].id == '33'){
                    arr[i+1][j].setAttribute("class","clickable_image")
                    arr[i-1][j].setAttribute("class","clickable_image")
                    arr[i][j-1].setAttribute("class","clickable_image")
                }
                else if(j == 0 && arr[i][j].id == '33'){
                    arr[i+1][j].setAttribute("class","clickable_image")
                    arr[i-1][j].setAttribute("class","clickable_image")
                    arr[i][j+1].setAttribute("class","clickable_image")
                }
                else if (arr[i][j].id == '33'){
                        arr[i+1][j].setAttribute("class","clickable_image")
                        arr[i-1][j].setAttribute("class","clickable_image")
                        arr[i][j+1].setAttribute("class","clickable_image")
                        arr[i][j-1].setAttribute("class","clickable_image")
                    }
                }
            }
        }catch(e){
        console.log(e)  
    }
}

const check_win = () => {
    for( i = 0; i < 4; i++){
        var temp = document.getElementById("row"+[i])
        for(j = 0; j < 4; j++){
            let curr =  temp.getElementsByTagName("div")[j]
            if(curr.id != i+''+j) return 
        }
    }
    //Get rid of gameboard and replace with congrats message & best time/move ratio:
    //localStorage.removeItem("high_score")
    if(localStorage.getItem("high_score")==null)
        localStorage.setItem("high_score",game_time / click_count)
    else{
        let previous_high_score = localStorage.getItem("high_score")
        if(game_time / click_count<previous_high_score)
            localStorage.setItem("high_score",game_time / click_count)
    }
    clearInterval(actual_game_clock)
    document.getElementById("body").innerHTML = "<div class='winner'><h1>You Win!!</h1><br><h4>You made "+click_count+" moves in "+game_time+" seconds! (Average: "+(game_time/click_count)+" seconds per move)</h4><br><img src='./images/game_board.jpg'><br><h4>Best Average: "+localStorage.getItem("high_score")+" second(s) per move<div>"
    console.log(localStorage.getItem("high_score"))
}   
const cheat = () => {
    count = 0
    for( i = 0; i < 4; i++){
        var temp = document.getElementById("row"+[i])
        for(j = 0; j < 4; j++){
            let curr =  temp.getElementsByTagName("div")[j]
            curr.style.backgroundImage = 'url("./images/'+i+''+j+'.jpg")';
            curr.setAttribute("id", i+''+j);
            curr.innerHTML = "<h1>"+(count++)+"</h1>"
            curr.setAttribute("onClick", 'handle_click('+i+','+j+')');
            curr.setAttribute("class","non_click_image")  
        }
    }

    check()
}