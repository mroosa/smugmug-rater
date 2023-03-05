/* Cookies */
function createCookie(name,value,days) {
  let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  }
	document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

function readCookie(name) {
	const fullName = name + "=";
	const cookieAry = document.cookie.split(';');
	for(let i = 0; i < cookieAry.length; i++) {
		let c = cookieAry[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(fullName) === 0) return c.substring(fullName.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* Ratings */
const starRating = document.querySelector('.star_rating');
const allstar = document.querySelectorAll('.star');
const starContain = document.querySelector('.button_wrap');
let currentStarLevel = document.querySelector('.current_rating');
let imgHasBeenRated = false;


function setRating(argRating) {
  let currentStarLevelValue = argRating;
  starRating.dataset.rating = currentStarLevelValue;
  currentStarLevel.innerText = `${currentStarLevelValue} of 5`;
  imgHasBeenRated = true;
  starContain.classList.add('set');
  currentStarLevel.classList.add('set');
  allstar.forEach((star, j) => {
    if( currentStarLevelValue >= j+1 ) {
      star.classList.remove('hollow');
    } else {
      star.classList.add('hollow');
    }
  });
}

allstar.forEach((star, i) => {

  star.onmouseover = function() {
    let currentStarLevelValue = i + 1;
    allstar.forEach((star, j) => {
      if( currentStarLevelValue >= j+1 ) {
        star.classList.add('below');
      } else {
        star.classList.remove('below');
      }
    });
  }

  star.onmouseout = function() {
    allstar.forEach((star) => {
      star.classList.remove('below');
    });
    if (imgHasBeenRated === false) {
      currentStarLevel.innerText = 'unrated';
    }
  }

  star.onclick = function() {
    setRating(i + 1);
  }

});

/* load images */
const imageNav = $('.image-nav');
// On load, pull first image serial key
function getCurImg() {
  return $('.image figure').data('key')
}
let curImgKey = getCurImg();

// on load pull user id from cookie, use function in case its needed elsewhere
function getUserId() {
  let uid;
  // check cookies for existing id, user if exists, create if doesn't
  if (readCookie('tkoenuserid')) {
    uid = readCookie('tkoenuserid');
  } else {
    // create unique identifier
    let ident = Math.floor(Math.random()*Date.now());
    // set cookie
    createCookie('tkoenuserid',ident,365);
    uid = readCookie('tkoenuserid');
  }
  // return user id
  return uid;
}
const userId = getUserId();

function getRating(argImgKey = curImgKey, argUser) {
  let ratingsInfo = '';
  // Parse JSON file
  $.ajax({
      url: 'data/ratings.json?nocache=' + (new Date()).getTime()
    })
    .done(function(data) {
      // search results for requested image
      for (key in data.images) {
        if (data.images[key].serial === argImgKey) {
          // find ratings for requested image
          const ratingsInfoAry = data.images[key].ratings;
          // if user is not defined, pull in global user id
          const theUser = (argUser) ? argUser : userId;
          for (k in ratingsInfoAry) {
            if (ratingsInfoAry[k].user === theUser) {
              ratingsInfo = ratingsInfoAry[k].score;
              setRating(ratingsInfo);
            }
          }
        }
      }
    })
    .fail( () => console.log('failed to retrieve ratings') )
    .always();
}

function clearRating() {
  starContain.classList.remove('set');
  starRating.dataset.rating = 0;
  allstar.forEach((star, j) => {
    star.classList.remove('hollow');
  });
  currentStarLevel.innerText = 'unrated';
}

function saveRating(argImgKey = curImgKey) {
  $.ajax({
      url: 'template/editRating.php',
      data: 't=' + userId + '&i=' + argImgKey + '&d=-1&r=' + starRating.dataset.rating
    })
    .done()
    .fail( () => console.log('fail') )
    .always();
}

function prepareStage() {
  // get current image's stored rating and return
  saveRating();
  // clear rating from main stage
  clearRating();
}

$('.image-nav a').click(function(e) {
  e.preventDefault();
  let newImg = ($(this).parent('li').attr('id') === 'next-image') ? $('figure').attr('data-nxt') : $('figure').attr('data-prv');
  $.ajax({
      url: 'template/displayImage.php',
      data: 'i=' + newImg + '&d=-1'
    })
    .done(function(data) {
      prepareStage();
      $('section.image').html(data);
      curImgKey = getCurImg();
      getRating();
      setNumber();
    })
    .fail( () => console.log('fail') )
    .always();

});

function setNumber() {
  let curImg = Number(document.getElementById('current_image').dataset.cur);
  displayImg = curImg < 9 ? "0" + (curImg + 1) : curImg + 1;
  document.getElementById('cur').innerText = displayImg;
}

// on load, get rating
getRating();
