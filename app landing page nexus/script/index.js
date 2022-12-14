let bar = document.querySelector(".main-nav .bars");
let vertNav = document.querySelector(".vert-nav");
let links =document.querySelectorAll("a");
let input = document.querySelectorAll("#button")
function stopdefault (e) {
    e.preventDefault()

}

links.forEach(link => {
    link.addEventListener("click", stopdefault)
})

// for navigation  button
let vertNavState = false ;

let openNav = () => {
    if (vertNavState === false) {
        vertNav.style.cssText = "transform:  translateX(0);";
        document.body.style.cssText = "overflow:hidden; "
        vertNavState = true;
     

    }else {
        vertNav.style.cssText = null;
        document.body.style.cssText = "overflow:visible;"
        vertNavState = false;
    }
}

input.forEach( inp => {
    inp.addEventListener("click", stopdefault)
})

bar.addEventListener("click", openNav);


// forscroll effect on nav bar 
 
let nav = document.querySelector(".main-nav");
let sections = document.querySelectorAll("section");

window.onwheel = e => {

    if (vertNavState === false) {
        if(e.deltaY >= 0) {
            // console.log("scrolldown")
            nav.style.cssText = "transform: translateY(-100%);"
            sections[0].style.cssText = "margin-top:0;"
        } else {
            nav.style.cssText =null
            sections[0].style.cssText = null
        }
    }
    
}

///////////////////


let resizeObserve = new ResizeObserver(entries => {
    // console.log(entries)  
    
    entries.forEach(entry => {
        if (entry.target.clientWidth >" 1000") {
            // console.log("gg")
            vertNav.style = vertNav.style= "display:none;";
            document.body.style.cssText = "overflow:visible; "
            vertNavState = false;
            

        }
    })
})

resizeObserve.observe(document.body);




let IntObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            // console.log(entry)
            let children = entry.target.children;
            let childcount = entry.target.childElementCount;
            if (entry.isIntersecting) {
                // console.log(entry.target);
                
                for (i = 0; i < childcount;i++ ) {
                    children[i].style.cssText = "transform: translateY(0); opacity:1; filter: blur(0px);" ;

                }
            } else if (!entry.isIntersecting ) {
                for (i = 0; i < childcount;i++ ) {
                    children[i].style.cssText = "transform: translateY(120%); opacity:0; filter: blur(10px);";
                 }
            }
        })
    }
, {threshold:0.1})

sections.forEach( section => {
    IntObserver.observe(section);
})


