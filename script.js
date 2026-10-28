const dialogRef = document.getElementById('pokemonOverlay');


function openDialog(element) {
    
    dialogRef.showModal();
}

function closeDialog() {
    dialogRef.close();
}

function stopPropagation(event) {
    event.stopPropagation();
}