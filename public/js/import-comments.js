// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/




let dropArea = document.getElementById('drop-area')



  //////////////////////////////////////////////////////////////////
  // add an indicator to let the user know that they have indeed dragged the item over the correct area
  //////////////////////////////////////////////////////////////////

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

//////////////////////////////////////////////////////////////////
// figure out what to do when some files are dropped
//////////////////////////////////////////////////////////////////

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}

//////////////////////////////////////////////////////////////////
// convert it to an array in order to iterate over it more easily
////////////////////////////////////////////////////////////////////

function handleFiles(files) {
  ([...files]).forEach(uploadFile)
}


//////////////////////////////////////////////////////////////////
// uploadFile
////////////////////////////////////////////////////////////////////

function uploadFile(file) {
  let url = './comment-imports'
  let formData = new FormData()

  formData.append('file', file)

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(() => { /* Done. Inform the user */ })
    .catch(() => { /* Error. Inform the user */ })
}