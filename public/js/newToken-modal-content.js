// Get the newTokenModal
var newTokenModal = document.getElementById("newTokenModal");

// Get the button that opens the newTokenModal
var newToken = document.getElementById("newToken");

// Get the <closeNewToken> element that closes the newTokenModal
var closeNewToken = document.getElementsByClassName("closeNewToken")[0];

// Get the <cancelNewToken> element that closes the newTokenModal
var cancelNewToken = document.getElementsByClassName("cancelNewToken")[0];


// When the user clicks on the newToken <GET NEW TOKEN button>, open the newTokenModal
newToken.onclick = function () {
  newTokenModal.style.display = "block";
}

// When the user clicks on closeNewToken (x), close the newTokenModal
closeNewToken.onclick = function () {
  newTokenModal.style.display = "none";
}

// When the user clicks on cancelNewToken <CANCEL button>, close the newTokenModal
cancelNewToken.onclick = function () {
  newTokenModal.style.display = "none";
}

// When the user clicks on confirmNewToken  <YES, GO AHEAD button>, close the newTokenModal and open the newTokenModalConfirmed modal

confirmNewToken.onclick = function () {
  newTokenModal.style.display = "none";
  newTokenModalConfirmed.style.display = "block";
}

// When the user clicks on closeTokenModalConfirmed button <OK button>, close the newTokenModalConfirmed modal
closeTokenModalConfirmed.onclick = function () {
  newTokenModalConfirmed.style.display = "none";
}
