// function Sendmessage(){
//     let name = document.getElementById("name").value;

//     if(name==""){
//         alert("please enter your name,");
//     }
//     else{
//         alert("Thank You, " + name + "!");
//     }
// }
// function Sendmessage() {
//   // Prevent form reload
//   event.preventDefault();

//   // Redirect to receipt page
//   window.location.href = "receipt.html";
// }
document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        // Get customer information
        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;

        // Save customer information
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerMessage", message);

        // Go to receipt
        window.location.href = "receipt.html";
    }
);
