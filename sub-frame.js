var btn = document.getElementById('test');

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function storageAccessAPISupported() {
  return (
    'hasStorageAccess' in document &&
    'requestStorageAccess' in document
  );
}

function accessStorage(fn) {
  console.log('cookies before::',document.cookie);
  document.hasStorageAccess()
    .then(function (hasAccess){
      if (hasAccess) {
        console.info('Storage API Access already granted');
        fn();
        return;
      }

      console.info('no existing Storage API Access ...');
      console.info('requesting Storage API Access ...');

      document.requestStorageAccess()
        .then(function () {
          console.info('Storage API Access granted.');
          fn();
          return;
        }, function (){
          console.warn('Storage API Access denied.');
        });
    }, function (reason) {
      console.warn('something went wrong ...');
      console.error(reason);
    });
}


function updateId() {
  document.cookie = "foo=bar"; 
  console.log("stored Cookie:: ",document.cookie);
}

function attachEventHandlers() {
  btn.addEventListener('click', accessStorage.bind(null, updateId));
}

function onReady() {
  if (!storageAccessAPISupported()) {
    btn.setAttribute('disabled', true);
    btn.classList.add('pure-button-disabled');
    btn.innerText = 'Storage Access API not supported';
    return;
  }
  attachEventHandlers();
}

ready(onReady)