'use strict'

window.addEventListener('load', function () {
  $('.hero-title').css('visibility', 'visible').addClass('zoomIn')
  $('.services-cube-label').addClass('has-loaded')
  $('.clients-globe').addClass('has-loaded')
  setTimeout(function () {
    $('.clients-dot').addClass('has-loaded')
  }, 500)
  setTimeout(function () {
    $('.clients-dot-description').addClass('has-loaded')
  }, 1000)

  // Scroll prompt
  setTimeout(function () {
    $('.scroll-prompt').addClass('has-loaded')
    $('.scroll-prompt-circle').addClass('has-loaded')
  }, 500)
  setTimeout(function () {
    $('.scroll-prompt-text').addClass('has-loaded')
  }, 2800)
})

$(function () {
  new WOW().init()

  setTimeout(function () {
    $('.scroll-prompt').addClass('has-loaded')
    $('.scroll-prompt-circle').addClass('has-loaded')
  }, 1500)
  setTimeout(function () {
    $('.scroll-prompt-text').addClass('has-loaded')
  }, 2800)

  // Form Validation

  if ($('.js-contact-form').length) {
    $('.js-contact-form').parsley()

    $('input, textarea').on('change', function () {
      if ($(this).parsley().isValid()) {
        $(this).siblings('.error-message').removeClass('is-visible')
      } else {
        $(this).siblings('.error-message').addClass('is-visible')
      }
    })
  }

  $('.input-tooltip').on('click', function () {
    if ($(window).width() < 992) {
      var $tooltipContent2 = $(this).children('.input-tooltip-content')

      $tooltipContent2.toggleClass('is-visible')
      $('.input-tooltip-content').not($tooltipContent2).removeClass('is-visible')
    }
  })

  // Cookie Notice

  // When there is not decision about the notice:
  if (!localStorage.cookieNotice) {
    $('.cookie-notice').removeClass('is-hidden')
    $('body').addClass('cookie-is-open')
  }

  // A button in the cookie notice is clicked:
  $('.cookie-notice-btn').on('click', function () {
    $('.cookie-notice').addClass('is-hidden')
    $('body').removeClass('cookie-is-open')

    // If accept button is clicked:
    if ($(this).hasClass('cookie-notice-accept')) {
      localStorage.setItem('cookieNotice', 'yes')

      // Analytics run
      ga('create', 'UA-97049655-1', 'auto')
      ga('send', 'pageview')
    } else {
      // If other button is clicked...
      // Remember not to show the notice, don't run analytics;
      localStorage.setItem('cookieNotice', 'no')
    }
  })

  // Input tooltips

  $('.contact-input').on('input', function () {
    var $contactTooltip = $(this).siblings('.input-tooltip')

    if ($(this).val().length > 0) {
      $contactTooltip.addClass('is-active')
    } else {
      $contactTooltip.removeClass('is-active')
      $(this).siblings('.error-message').removeClass('is-visible')
    }
  })

  $('.contact-textarea').on('input', function () {
    var $contactTooltip2 = $(this).siblings('.input-tooltip')

    if ($(this).val().length > 0) {
      $contactTooltip2.addClass('is-active')
    } else {
      $contactTooltip2.removeClass('is-active')
    }

    if ($(this).val().length >= 250) {
      $('.textarea-counter').addClass('is-invalid')
    } else if ($(this).val().length > 0) {
      $('.textarea-counter').addClass('is-valid')
    } else {
      $('.textarea-counter').removeClass('is-invalid')
      $('.textarea-counter').removeClass('is-valid')
    }
  })

  var textareaMaxLength = 250
  $('.contact-textarea').keyup(function () {
    var length = $(this).val().length
    var length = textareaMaxLength - length
    $('.counter-number').text(length)

    if (length === 0) {
      $('.counter-number').addClass('is-invalid')
    }
  })

  // Human test

  var random1 = Math.floor(Math.random() * 4) + 1
  var random2 = Math.floor(Math.random() * 5) + 1

  $('.test-number-1').text(random1)
  $('.test-number-2').text(random2)
  $('.test-input').on('input', function () {
    $('.form-text-message').removeClass('is-valid is-invalid')
    $('.form-test-icon').removeClass('is-valid is-invalid')
    $('.contact-form-submit').removeClass('is-inactive')
    $('.test-input').removeClass('is-valid')
    $('.test-input').removeClass('is-invalid')

    if (parseInt($(this).val()) === (random1 + random2)) {
      $('.form-text-message').text('You can now submit').addClass('is-valid')
      $('.form-test-icon').addClass('is-valid')
      $('.contact-form-submit').removeClass('is-inactive')
      $('.test-input').addClass('is-valid')
    } else {
      $('.form-text-message').text('Please try again').addClass('is-invalid')
      $('.form-test-icon').addClass('is-invalid')
      $('.contact-form-submit').addClass('is-inactive')
      $('.test-input').addClass('is-invalid')
    }
  })

  $('.js-contact-form').on('submit', function (e) {
    e.preventDefault()

    // var formData = {
    //   'name': $('input[name=name]').val(),
    //   'email': $('input[name=email]').val(),
    //   'phone': $('input[name=phone]').val(),
    //   'message': $('textarea[name=message]').val()
    // }

    $.ajax({
      type: 'POST',
      url: 'https://getform.org/f/80bc63ff-b5d4-4b9e-9be1-d841895c8daf',
      data: $(this).serialize(),
      crossDomain: true
    })

    $('.contact-form-container').hide()
    $('.contact-confirmation').show()

    setTimeout(function () {
      $('.spinner-wrapper').hide()
      $('.confirmation').show()
    }, 2500)
  })

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault()
      return false
    }
  })

  // Tooltip

  $('.tooltip-icon').on('click', function () {
    var $tooltipContent = $(this).children('.tooltip-content')

    $tooltipContent.toggleClass('is-active is-hidden')
    $('.tooltip-content').not($tooltipContent).removeClass('is-active')
  })

  // Mobile Menu Btn
  $('.menu-btn').on('click', function () {
    $(this).toggleClass('is-open')
    $('body').toggleClass('is-fixed')
    $('.menu-circle').toggleClass('is-open')
    $('.header-nav').toggleClass('is-open')

    if ($('.header-nav').hasClass('is-open')) {
      $('body').removeClass('cookie-is-open')
    } else if (!$('.header-nav').hasClass('is-open') && $('.cookie-notice').hasClass('is-hidden')) {
      $('body').removeClass('cookie-is-open')
    } else {
      $('body').addClass('cookie-is-open')
    }
  })

  // Full Page scroll

  if ($(window).width() > 992) {
    createFullpage()
  }

  function createFullpage () {
    $('#fullpage').fullpage({
      verticalCentered: false,
      scrollBar: true,
      navigation: true,
      navigationPosition: 'left',
      afterRender: function () {
        new WOW().init()
      },
      afterLoad: function (anchorLink, index) {
        if (index === 1) {
          $('#fp-nav').hide() // or toggle by class
        } else {
          $('#fp-nav').show() // or toggle by class
        }
        if ($('.services-diagram').hasClass('active')) {
          $('#fp-nav span').removeClass('is-grey')
          $('#fp-nav span').addClass('is-white')
        } else {
          $('#fp-nav span').removeClass('is-white')
          $('#fp-nav span').addClass('is-grey')
        }

        if ($('.clients-section').length) {
          $('#fp-nav').hide()
        }
      }
    })
  }

  $(window).on('resize orientationchange', function () {
    var width = $(window).width()

    if (width < 992 && $.fn.fullpage.destroy) {
      jQuery.fn.fullpage.destroy('all')
    }

    if (width >= 992 && $('.fp-destroyed').length) {
      createFullpage()
    }
  }).trigger('resize')

  // Services Carousel

  $('.diagram-carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var $diagramTitle = $('.diagram-title')
    var $diagramNumber = $('.diagram-number')
    var $navTop = $('.diagram-nav-top')
    var $navRight = $('.diagram-nav-right')
    var $navBottom = $('.diagram-nav-bottom')
    var $navLeft = $('.diagram-nav-left')
    var $dots1 = $navTop.children('.diagram-dot')
    var $dots2 = $navRight.children('.diagram-dot')
    var $dots3 = $navBottom.children('.diagram-dot')
    var $dots4 = $navLeft.children('.diagram-dot')

    $('.diagram-nav-point').removeClass('is-current')

    if (nextSlide === 0) {
      $diagramTitle.html('Insight<br>Validation')
      $diagramNumber.html('1')
      $navTop.addClass('is-current')

      if ($navTop.hasClass('is-current') && $dots1.hasClass('has-loaded') && $dots2.hasClass('has-loaded') && $dots3.hasClass('has-loaded')) {
        $dots4.addClass('has-loaded')
        $navLeft.removeClass('is-inactive')
        setTimeout(function () {
          $dots1.removeClass('has-loaded')
          $dots2.removeClass('has-loaded')
          $dots3.removeClass('has-loaded')
        }, 900)
      } else if ($navTop.hasClass('is-current') && $dots1.hasClass('has-loaded') && $dots2.hasClass('has-loaded') && !$dots3.hasClass('has-loaded')) {
        $dots2.removeClass('has-loaded')
        $navBottom.addClass('is-inactive')
        setTimeout(function () {
          $dots1.removeClass('has-loaded')
        }, 800)
      } else {
        $dots1.removeClass('has-loaded')
        $navBottom.addClass('is-inactive')
      }
    }
    if (nextSlide === 1) {
      $diagramTitle.html('Discover Human<br>Motivation')
      $diagramNumber.html('2')
      $navRight.addClass('is-current')
      $navBottom.removeClass('is-inactive')
      $dots1.addClass('has-loaded')

      if ($navRight.hasClass('is-current') && $dots4.hasClass('has-loaded') && !$dots3.hasClass('has-loaded') && !$dots2.hasClass('has-loaded') && $dots1.hasClass('has-loaded')) {
        $dots4.removeClass('has-loaded')
        $navLeft.addClass('is-inactive')
      } else if ($navRight.hasClass('is-current') && $dots2.hasClass('has-loaded') && $dots3.hasClass('has-loaded')) {
        $dots3.removeClass('has-loaded')
        setTimeout(function () {
          $navLeft.addClass('is-inactive')
          $dots2.removeClass('has-loaded')
        }, 800)
      } else {
        $navLeft.addClass('is-inactive')
        $dots2.removeClass('has-loaded')
      }
    }
    if (nextSlide === 2) {
      $diagramTitle.html('Designing The<br>Right Thing')
      $diagramNumber.html('3')
      $navBottom.addClass('is-current').removeClass('is-inactive')
      $navLeft.removeClass('is-inactive')
      $dots2.addClass('has-loaded')
      if ($navBottom.hasClass('is-current')) {
        $dots3.removeClass('has-loaded')
      }

      if ($navBottom.hasClass('is-current') && !$dots1.hasClass('has-loaded')) {
        $dots1.addClass('has-loaded')
      }
    }
    if (nextSlide === 3) {
      $diagramTitle.html('Get The<br>Thing Right')
      $diagramNumber.html('4')
      $navLeft.addClass('is-current').removeClass('is-inactive')
      $navRight.removeClass('is-inactive')
      $navBottom.removeClass('is-inactive')
      $dots3.addClass('has-loaded')
    }
  })

  $('.diagram-carousel').slick({
    dots: true,
    arrows: false,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick'
      }
    ]
  })

  $('.diagram-nav-top').on('click', function () {
    $('.diagram-carousel').slick('slickGoTo', 0)
  })

  $('.diagram-nav-right').on('click', function () {
    $('.diagram-carousel').slick('slickGoTo', 1)
  })

  $('.diagram-nav-bottom').on('click', function () {
    $('.diagram-carousel').slick('slickGoTo', 2)
  })

  $('.diagram-nav-left').on('click', function () {
    $('.diagram-carousel').slick('slickGoTo', 3)
  })

  // Clients Carousel

  $('.clients-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          focusOnSelect: false,
          variableWidth: false
        }
      }
    ]
  })

  // Bio box
  $('.bio-avatar').on('click', function () {
    $('.bio-box-content').removeClass('is-active')
    $('.bio-avatar').removeClass('is-active')
    $('.bio-box').removeClass('is-bianca')
    $(this).addClass('is-active')

    if ($(this).hasClass('bio-avatar-bianca')) {
      $('.bio-box-bianca').addClass('is-active')
      $('.bio-box').addClass('is-bianca')
    } else {
      $('.bio-box-nathan').addClass('is-active')
    }
  })

  // Particles

  // Home Page Particles

  if ($('#hero-particles').length) {
    var particle = jQuery('#hero-particles')
    particlesJS('hero-particles', {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': ['#8392F5', '#5AD6AE']
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.5,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 83,
          'color': '#33CC99',
          'opacity': 0.9311942171260817,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 3,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': true,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'repulse'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }

  // Our speciality particles

  if ($('#speciality-particles').length) {
    var particle = $('#our-speciality-particles')
    particlesJS('speciality-particles', {
      'particles': {
        'number': {
          'value': 30,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#e9404b'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': false,
          'distance': 150,
          'color': '#ffffff',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 3,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'repulse'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }

  // Services particles

  if ($('#services-hero-particles').length) {
    var particle = jQuery('#services-hero-particles')
    particlesJS('services-hero-particles', {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#8392F5'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.5,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': false,
          'distance': 83,
          'color': '#33CC99',
          'opacity': 0.9311942171260817,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 3,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': true,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'grab'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }
})

/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if (typeof jQuery === 'undefined') throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."); +(function (t) { var e = t.fn.jquery.split(' ')[0].split('.'); if (e[0] < 2 && e[1] < 9 || e[0] == 1 && e[1] == 9 && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0") }(jQuery)), +(function () {
  function t (t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || typeof e !== 'object' && typeof e !== 'function' ? t : e } function e (t, e) { if (typeof e !== 'function' && e !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof e); t.prototype = Object.create(e && e.prototype, {constructor: {value: t, enumerable: !1, writable: !0, configurable: !0}}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) } function n (t, e) { if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function') } var i = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) { return typeof t } : function (t) { return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t }, o = (function () { function t (t, e) { for (var n = 0; n < e.length; n++) { var i = e[n]; i.enumerable = i.enumerable || !1, i.configurable = !0, 'value' in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } } return function (e, n, i) { return n && t(e.prototype, n), i && t(e, i), e } }()), r = (function (t) { function e (t) { return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase() } function n (t) { return (t[0] || t).nodeType } function i () { return {bindType: a.end, delegateType: a.end, handle: function (e) { if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments) }} } function o () { if (window.QUnit) return !1; var t = document.createElement('bootstrap'); for (var e in h) if (void 0 !== t.style[e]) return {end: h[e]}; return !1 } function r (e) { var n = this, i = !1; return t(this).one(c.TRANSITION_END, function () { i = !0 }), setTimeout(function () { i || c.triggerTransitionEnd(n) }, e), this } function s () { a = o(), t.fn.emulateTransitionEnd = r, c.supportsTransitionEnd() && (t.event.special[c.TRANSITION_END] = i()) } var a = !1, l = 1e6, h = {WebkitTransition: 'webkitTransitionEnd', MozTransition: 'transitionend', OTransition: 'oTransitionEnd otransitionend', transition: 'transitionend'}, c = {TRANSITION_END: 'bsTransitionEnd', getUID: function (t) { do t += ~~(Math.random() * l); while (document.getElementById(t));return t }, getSelectorFromElement: function (t) { var e = t.getAttribute('data-target'); return e || (e = t.getAttribute('href') || '', e = /^#[a-z]/i.test(e) ? e : null), e }, reflow: function (t) { return t.offsetHeight }, triggerTransitionEnd: function (e) { t(e).trigger(a.end) }, supportsTransitionEnd: function () { return Boolean(a) }, typeCheckConfig: function (t, i, o) { for (var r in o) if (o.hasOwnProperty(r)) { var s = o[r], a = i[r], l = a && n(a) ? 'element' : e(a); if (!new RegExp(s).test(l)) throw new Error(t.toUpperCase() + ': ' + ('Option "' + r + '" provided type "' + l + '" ') + ('but expected type "' + s + '".')) } }}; return s(), c }(jQuery)), s = ((function (t) { var e = 'alert', i = '4.0.0-alpha.6', s = 'bs.alert', a = '.' + s, l = '.data-api', h = t.fn[e], c = 150, u = {DISMISS: '[data-dismiss="alert"]'}, d = {CLOSE: 'close' + a, CLOSED: 'closed' + a, CLICK_DATA_API: 'click' + a + l}, f = {ALERT: 'alert', FADE: 'fade', SHOW: 'show'}, _ = (function () { function e (t) { n(this, e), this._element = t } return e.prototype.close = function (t) { t = t || this._element; var e = this._getRootElement(t), n = this._triggerCloseEvent(e); n.isDefaultPrevented() || this._removeElement(e) }, e.prototype.dispose = function () { t.removeData(this._element, s), this._element = null }, e.prototype._getRootElement = function (e) { var n = r.getSelectorFromElement(e), i = !1; return n && (i = t(n)[0]), i || (i = t(e).closest('.' + f.ALERT)[0]), i }, e.prototype._triggerCloseEvent = function (e) { var n = t.Event(d.CLOSE); return t(e).trigger(n), n }, e.prototype._removeElement = function (e) { var n = this; return t(e).removeClass(f.SHOW), r.supportsTransitionEnd() && t(e).hasClass(f.FADE) ? void t(e).one(r.TRANSITION_END, function (t) { return n._destroyElement(e, t) }).emulateTransitionEnd(c) : void this._destroyElement(e) }, e.prototype._destroyElement = function (e) { t(e).detach().trigger(d.CLOSED).remove() }, e._jQueryInterface = function (n) { return this.each(function () { var i = t(this), o = i.data(s); o || (o = new e(this), i.data(s, o)), n === 'close' && o[n](this) }) }, e._handleDismiss = function (t) { return function (e) { e && e.preventDefault(), t.close(this) } }, o(e, null, [{key: 'VERSION', get: function () { return i }}]), e }()); return t(document).on(d.CLICK_DATA_API, u.DISMISS, _._handleDismiss(new _())), t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function () { return t.fn[e] = h, _._jQueryInterface }, _ }(jQuery)), (function (t) { var e = 'button', i = '4.0.0-alpha.6', r = 'bs.button', s = '.' + r, a = '.data-api', l = t.fn[e], h = {ACTIVE: 'active', BUTTON: 'btn', FOCUS: 'focus'}, c = {DATA_TOGGLE_CARROT: '[data-toggle^="button"]', DATA_TOGGLE: '[data-toggle="buttons"]', INPUT: 'input', ACTIVE: '.active', BUTTON: '.btn'}, u = {CLICK_DATA_API: 'click' + s + a, FOCUS_BLUR_DATA_API: 'focus' + s + a + ' ' + ('blur' + s + a)}, d = (function () { function e (t) { n(this, e), this._element = t } return e.prototype.toggle = function () { var e = !0, n = t(this._element).closest(c.DATA_TOGGLE)[0]; if (n) { var i = t(this._element).find(c.INPUT)[0]; if (i) { if (i.type === 'radio') if (i.checked && t(this._element).hasClass(h.ACTIVE))e = !1; else { var o = t(n).find(c.ACTIVE)[0]; o && t(o).removeClass(h.ACTIVE) }e && (i.checked = !t(this._element).hasClass(h.ACTIVE), t(i).trigger('change')), i.focus() } } this._element.setAttribute('aria-pressed', !t(this._element).hasClass(h.ACTIVE)), e && t(this._element).toggleClass(h.ACTIVE) }, e.prototype.dispose = function () { t.removeData(this._element, r), this._element = null }, e._jQueryInterface = function (n) { return this.each(function () { var i = t(this).data(r); i || (i = new e(this), t(this).data(r, i)), n === 'toggle' && i[n]() }) }, o(e, null, [{key: 'VERSION', get: function () { return i }}]), e }()); return t(document).on(u.CLICK_DATA_API, c.DATA_TOGGLE_CARROT, function (e) { e.preventDefault(); var n = e.target; t(n).hasClass(h.BUTTON) || (n = t(n).closest(c.BUTTON)), d._jQueryInterface.call(t(n), 'toggle') }).on(u.FOCUS_BLUR_DATA_API, c.DATA_TOGGLE_CARROT, function (e) { var n = t(e.target).closest(c.BUTTON)[0]; t(n).toggleClass(h.FOCUS, /^focus(in)?$/.test(e.type)) }), t.fn[e] = d._jQueryInterface, t.fn[e].Constructor = d, t.fn[e].noConflict = function () { return t.fn[e] = l, d._jQueryInterface }, d }(jQuery)), (function (t) { var e = 'carousel', s = '4.0.0-alpha.6', a = 'bs.carousel', l = '.' + a, h = '.data-api', c = t.fn[e], u = 600, d = 37, f = 39, _ = {interval: 5e3, keyboard: !0, slide: !1, pause: 'hover', wrap: !0}, g = {interval: '(number|boolean)', keyboard: 'boolean', slide: '(boolean|string)', pause: '(string|boolean)', wrap: 'boolean'}, p = {NEXT: 'next', PREV: 'prev', LEFT: 'left', RIGHT: 'right'}, m = {SLIDE: 'slide' + l, SLID: 'slid' + l, KEYDOWN: 'keydown' + l, MOUSEENTER: 'mouseenter' + l, MOUSELEAVE: 'mouseleave' + l, LOAD_DATA_API: 'load' + l + h, CLICK_DATA_API: 'click' + l + h}, E = {CAROUSEL: 'carousel', ACTIVE: 'active', SLIDE: 'slide', RIGHT: 'carousel-item-right', LEFT: 'carousel-item-left', NEXT: 'carousel-item-next', PREV: 'carousel-item-prev', ITEM: 'carousel-item'}, v = {ACTIVE: '.active', ACTIVE_ITEM: '.active.carousel-item', ITEM: '.carousel-item', NEXT_PREV: '.carousel-item-next, .carousel-item-prev', INDICATORS: '.carousel-indicators', DATA_SLIDE: '[data-slide], [data-slide-to]', DATA_RIDE: '[data-ride="carousel"]'}, T = (function () { function h (e, i) { n(this, h), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(v.INDICATORS)[0], this._addEventListeners() } return h.prototype.next = function () { if (this._isSliding) throw new Error('Carousel is sliding'); this._slide(p.NEXT) }, h.prototype.nextWhenVisible = function () { document.hidden || this.next() }, h.prototype.prev = function () { if (this._isSliding) throw new Error('Carousel is sliding'); this._slide(p.PREVIOUS) }, h.prototype.pause = function (e) { e || (this._isPaused = !0), t(this._element).find(v.NEXT_PREV)[0] && r.supportsTransitionEnd() && (r.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null }, h.prototype.cycle = function (t) { t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval)) }, h.prototype.to = function (e) { var n = this; this._activeElement = t(this._element).find(v.ACTIVE_ITEM)[0]; var i = this._getItemIndex(this._activeElement); if (!(e > this._items.length - 1 || e < 0)) { if (this._isSliding) return void t(this._element).one(m.SLID, function () { return n.to(e) }); if (i === e) return this.pause(), void this.cycle(); var o = e > i ? p.NEXT : p.PREVIOUS; this._slide(o, this._items[e]) } }, h.prototype.dispose = function () { t(this._element).off(l), t.removeData(this._element, a), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null }, h.prototype._getConfig = function (n) { return n = t.extend({}, _, n), r.typeCheckConfig(e, n, g), n }, h.prototype._addEventListeners = function () { var e = this; this._config.keyboard && t(this._element).on(m.KEYDOWN, function (t) { return e._keydown(t) }), this._config.pause !== 'hover' || 'ontouchstart' in document.documentElement || t(this._element).on(m.MOUSEENTER, function (t) { return e.pause(t) }).on(m.MOUSELEAVE, function (t) { return e.cycle(t) }) }, h.prototype._keydown = function (t) { if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) { case d:t.preventDefault(), this.prev(); break; case f:t.preventDefault(), this.next(); break; default:return } }, h.prototype._getItemIndex = function (e) { return this._items = t.makeArray(t(e).parent().find(v.ITEM)), this._items.indexOf(e) }, h.prototype._getItemByDirection = function (t, e) { var n = t === p.NEXT, i = t === p.PREVIOUS, o = this._getItemIndex(e), r = this._items.length - 1, s = i && o === 0 || n && o === r; if (s && !this._config.wrap) return e; var a = t === p.PREVIOUS ? -1 : 1, l = (o + a) % this._items.length; return l === -1 ? this._items[this._items.length - 1] : this._items[l] }, h.prototype._triggerSlideEvent = function (e, n) { var i = t.Event(m.SLIDE, {relatedTarget: e, direction: n}); return t(this._element).trigger(i), i }, h.prototype._setActiveIndicatorElement = function (e) { if (this._indicatorsElement) { t(this._indicatorsElement).find(v.ACTIVE).removeClass(E.ACTIVE); var n = this._indicatorsElement.children[this._getItemIndex(e)]; n && t(n).addClass(E.ACTIVE) } }, h.prototype._slide = function (e, n) { var i = this, o = t(this._element).find(v.ACTIVE_ITEM)[0], s = n || o && this._getItemByDirection(e, o), a = Boolean(this._interval), l = void 0, h = void 0, c = void 0; if (e === p.NEXT ? (l = E.LEFT, h = E.NEXT, c = p.LEFT) : (l = E.RIGHT, h = E.PREV, c = p.RIGHT), s && t(s).hasClass(E.ACTIVE)) return void (this._isSliding = !1); var d = this._triggerSlideEvent(s, c); if (!d.isDefaultPrevented() && o && s) { this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(s); var f = t.Event(m.SLID, {relatedTarget: s, direction: c}); r.supportsTransitionEnd() && t(this._element).hasClass(E.SLIDE) ? (t(s).addClass(h), r.reflow(s), t(o).addClass(l), t(s).addClass(l), t(o).one(r.TRANSITION_END, function () { t(s).removeClass(l + ' ' + h).addClass(E.ACTIVE), t(o).removeClass(E.ACTIVE + ' ' + h + ' ' + l), i._isSliding = !1, setTimeout(function () { return t(i._element).trigger(f) }, 0) }).emulateTransitionEnd(u)) : (t(o).removeClass(E.ACTIVE), t(s).addClass(E.ACTIVE), this._isSliding = !1, t(this._element).trigger(f)), a && this.cycle() } }, h._jQueryInterface = function (e) { return this.each(function () { var n = t(this).data(a), o = t.extend({}, _, t(this).data()); (typeof e === 'undefined' ? 'undefined' : i(e)) === 'object' && t.extend(o, e); var r = typeof e === 'string' ? e : o.slide; if (n || (n = new h(this, o), t(this).data(a, n)), typeof e === 'number')n.to(e); else if (typeof r === 'string') { if (void 0 === n[r]) throw new Error('No method named "' + r + '"'); n[r]() } else o.interval && (n.pause(), n.cycle()) }) }, h._dataApiClickHandler = function (e) { var n = r.getSelectorFromElement(this); if (n) { var i = t(n)[0]; if (i && t(i).hasClass(E.CAROUSEL)) { var o = t.extend({}, t(i).data(), t(this).data()), s = this.getAttribute('data-slide-to'); s && (o.interval = !1), h._jQueryInterface.call(t(i), o), s && t(i).data(a).to(s), e.preventDefault() } } }, o(h, null, [{key: 'VERSION', get: function () { return s }}, {key: 'Default', get: function () { return _ }}]), h }()); return t(document).on(m.CLICK_DATA_API, v.DATA_SLIDE, T._dataApiClickHandler), t(window).on(m.LOAD_DATA_API, function () { t(v.DATA_RIDE).each(function () { var e = t(this); T._jQueryInterface.call(e, e.data()) }) }), t.fn[e] = T._jQueryInterface, t.fn[e].Constructor = T, t.fn[e].noConflict = function () { return t.fn[e] = c, T._jQueryInterface }, T }(jQuery)), (function (t) { var e = 'collapse', s = '4.0.0-alpha.6', a = 'bs.collapse', l = '.' + a, h = '.data-api', c = t.fn[e], u = 600, d = {toggle: !0, parent: ''}, f = {toggle: 'boolean', parent: 'string'}, _ = {SHOW: 'show' + l, SHOWN: 'shown' + l, HIDE: 'hide' + l, HIDDEN: 'hidden' + l, CLICK_DATA_API: 'click' + l + h}, g = {SHOW: 'show', COLLAPSE: 'collapse', COLLAPSING: 'collapsing', COLLAPSED: 'collapsed'}, p = {WIDTH: 'width', HEIGHT: 'height'}, m = {ACTIVES: '.card > .show, .card > .collapsing', DATA_TOGGLE: '[data-toggle="collapse"]'}, E = (function () { function l (e, i) { n(this, l), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],' + ('[data-toggle="collapse"][data-target="#' + e.id + '"]'))), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle() } return l.prototype.toggle = function () { t(this._element).hasClass(g.SHOW) ? this.hide() : this.show() }, l.prototype.show = function () { var e = this; if (this._isTransitioning) throw new Error('Collapse is transitioning'); if (!t(this._element).hasClass(g.SHOW)) { var n = void 0, i = void 0; if (this._parent && (n = t.makeArray(t(this._parent).find(m.ACTIVES)), n.length || (n = null)), !(n && (i = t(n).data(a), i && i._isTransitioning))) { var o = t.Event(_.SHOW); if (t(this._element).trigger(o), !o.isDefaultPrevented()) { n && (l._jQueryInterface.call(t(n), 'hide'), i || t(n).data(a, null)); var s = this._getDimension(); t(this._element).removeClass(g.COLLAPSE).addClass(g.COLLAPSING), this._element.style[s] = 0, this._element.setAttribute('aria-expanded', !0), this._triggerArray.length && t(this._triggerArray).removeClass(g.COLLAPSED).attr('aria-expanded', !0), this.setTransitioning(!0); var h = function () { t(e._element).removeClass(g.COLLAPSING).addClass(g.COLLAPSE).addClass(g.SHOW), e._element.style[s] = '', e.setTransitioning(!1), t(e._element).trigger(_.SHOWN) }; if (!r.supportsTransitionEnd()) return void h(); var c = s[0].toUpperCase() + s.slice(1), d = 'scroll' + c; t(this._element).one(r.TRANSITION_END, h).emulateTransitionEnd(u), this._element.style[s] = this._element[d] + 'px' } } } }, l.prototype.hide = function () { var e = this; if (this._isTransitioning) throw new Error('Collapse is transitioning'); if (t(this._element).hasClass(g.SHOW)) { var n = t.Event(_.HIDE); if (t(this._element).trigger(n), !n.isDefaultPrevented()) { var i = this._getDimension(), o = i === p.WIDTH ? 'offsetWidth' : 'offsetHeight'; this._element.style[i] = this._element[o] + 'px', r.reflow(this._element), t(this._element).addClass(g.COLLAPSING).removeClass(g.COLLAPSE).removeClass(g.SHOW), this._element.setAttribute('aria-expanded', !1), this._triggerArray.length && t(this._triggerArray).addClass(g.COLLAPSED).attr('aria-expanded', !1), this.setTransitioning(!0); var s = function () { e.setTransitioning(!1), t(e._element).removeClass(g.COLLAPSING).addClass(g.COLLAPSE).trigger(_.HIDDEN) }; return this._element.style[i] = '', r.supportsTransitionEnd() ? void t(this._element).one(r.TRANSITION_END, s).emulateTransitionEnd(u) : void s() } } }, l.prototype.setTransitioning = function (t) { this._isTransitioning = t }, l.prototype.dispose = function () { t.removeData(this._element, a), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null }, l.prototype._getConfig = function (n) { return n = t.extend({}, d, n), n.toggle = Boolean(n.toggle), r.typeCheckConfig(e, n, f), n }, l.prototype._getDimension = function () { var e = t(this._element).hasClass(p.WIDTH); return e ? p.WIDTH : p.HEIGHT }, l.prototype._getParent = function () { var e = this, n = t(this._config.parent)[0], i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'; return t(n).find(i).each(function (t, n) { e._addAriaAndCollapsedClass(l._getTargetFromElement(n), [n]) }), n }, l.prototype._addAriaAndCollapsedClass = function (e, n) { if (e) { var i = t(e).hasClass(g.SHOW); e.setAttribute('aria-expanded', i), n.length && t(n).toggleClass(g.COLLAPSED, !i).attr('aria-expanded', i) } }, l._getTargetFromElement = function (e) { var n = r.getSelectorFromElement(e); return n ? t(n)[0] : null }, l._jQueryInterface = function (e) { return this.each(function () { var n = t(this), o = n.data(a), r = t.extend({}, d, n.data(), (typeof e === 'undefined' ? 'undefined' : i(e)) === 'object' && e); if (!o && r.toggle && /show|hide/.test(e) && (r.toggle = !1), o || (o = new l(this, r), n.data(a, o)), typeof e === 'string') { if (void 0 === o[e]) throw new Error('No method named "' + e + '"'); o[e]() } }) }, o(l, null, [{key: 'VERSION', get: function () { return s }}, {key: 'Default', get: function () { return d }}]), l }()); return t(document).on(_.CLICK_DATA_API, m.DATA_TOGGLE, function (e) { e.preventDefault(); var n = E._getTargetFromElement(this), i = t(n).data(a), o = i ? 'toggle' : t(this).data(); E._jQueryInterface.call(t(n), o) }), t.fn[e] = E._jQueryInterface, t.fn[e].Constructor = E, t.fn[e].noConflict = function () { return t.fn[e] = c, E._jQueryInterface }, E }(jQuery)), (function (t) { var e = 'dropdown', i = '4.0.0-alpha.6', s = 'bs.dropdown', a = '.' + s, l = '.data-api', h = t.fn[e], c = 27, u = 38, d = 40, f = 3, _ = {HIDE: 'hide' + a, HIDDEN: 'hidden' + a, SHOW: 'show' + a, SHOWN: 'shown' + a, CLICK: 'click' + a, CLICK_DATA_API: 'click' + a + l, FOCUSIN_DATA_API: 'focusin' + a + l, KEYDOWN_DATA_API: 'keydown' + a + l}, g = {BACKDROP: 'dropdown-backdrop', DISABLED: 'disabled', SHOW: 'show'}, p = {BACKDROP: '.dropdown-backdrop', DATA_TOGGLE: '[data-toggle="dropdown"]', FORM_CHILD: '.dropdown form', ROLE_MENU: '[role="menu"]', ROLE_LISTBOX: '[role="listbox"]', NAVBAR_NAV: '.navbar-nav', VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'}, m = (function () { function e (t) { n(this, e), this._element = t, this._addEventListeners() } return e.prototype.toggle = function () { if (this.disabled || t(this).hasClass(g.DISABLED)) return !1; var n = e._getParentFromElement(this), i = t(n).hasClass(g.SHOW); if (e._clearMenus(), i) return !1; if ('ontouchstart' in document.documentElement && !t(n).closest(p.NAVBAR_NAV).length) { var o = document.createElement('div'); o.className = g.BACKDROP, t(o).insertBefore(this), t(o).on('click', e._clearMenus) } var r = {relatedTarget: this}, s = t.Event(_.SHOW, r); return t(n).trigger(s), !s.isDefaultPrevented() && (this.focus(), this.setAttribute('aria-expanded', !0), t(n).toggleClass(g.SHOW), t(n).trigger(t.Event(_.SHOWN, r)), !1) }, e.prototype.dispose = function () { t.removeData(this._element, s), t(this._element).off(a), this._element = null }, e.prototype._addEventListeners = function () { t(this._element).on(_.CLICK, this.toggle) }, e._jQueryInterface = function (n) { return this.each(function () { var i = t(this).data(s); if (i || (i = new e(this), t(this).data(s, i)), typeof n === 'string') { if (void 0 === i[n]) throw new Error('No method named "' + n + '"'); i[n].call(this) } }) }, e._clearMenus = function (n) { if (!n || n.which !== f) { var i = t(p.BACKDROP)[0]; i && i.parentNode.removeChild(i); for (var o = t.makeArray(t(p.DATA_TOGGLE)), r = 0; r < o.length; r++) { var s = e._getParentFromElement(o[r]), a = {relatedTarget: o[r]}; if (t(s).hasClass(g.SHOW) && !(n && (n.type === 'click' && /input|textarea/i.test(n.target.tagName) || n.type === 'focusin') && t.contains(s, n.target))) { var l = t.Event(_.HIDE, a); t(s).trigger(l), l.isDefaultPrevented() || (o[r].setAttribute('aria-expanded', 'false'), t(s).removeClass(g.SHOW).trigger(t.Event(_.HIDDEN, a))) } } } }, e._getParentFromElement = function (e) { var n = void 0, i = r.getSelectorFromElement(e); return i && (n = t(i)[0]), n || e.parentNode }, e._dataApiKeydownHandler = function (n) { if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !t(this).hasClass(g.DISABLED))) { var i = e._getParentFromElement(this), o = t(i).hasClass(g.SHOW); if (!o && n.which !== c || o && n.which === c) { if (n.which === c) { var r = t(i).find(p.DATA_TOGGLE)[0]; t(r).trigger('focus') } return void t(this).trigger('click') } var s = t(i).find(p.VISIBLE_ITEMS).get(); if (s.length) { var a = s.indexOf(n.target); n.which === u && a > 0 && a--, n.which === d && a < s.length - 1 && a++, a < 0 && (a = 0), s[a].focus() } } }, o(e, null, [{key: 'VERSION', get: function () { return i }}]), e }()); return t(document).on(_.KEYDOWN_DATA_API, p.DATA_TOGGLE, m._dataApiKeydownHandler).on(_.KEYDOWN_DATA_API, p.ROLE_MENU, m._dataApiKeydownHandler).on(_.KEYDOWN_DATA_API, p.ROLE_LISTBOX, m._dataApiKeydownHandler).on(_.CLICK_DATA_API + ' ' + _.FOCUSIN_DATA_API, m._clearMenus).on(_.CLICK_DATA_API, p.DATA_TOGGLE, m.prototype.toggle).on(_.CLICK_DATA_API, p.FORM_CHILD, function (t) { t.stopPropagation() }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () { return t.fn[e] = h, m._jQueryInterface }, m }(jQuery)), (function (t) { var e = 'modal', s = '4.0.0-alpha.6', a = 'bs.modal', l = '.' + a, h = '.data-api', c = t.fn[e], u = 300, d = 150, f = 27, _ = {backdrop: !0, keyboard: !0, focus: !0, show: !0}, g = {backdrop: '(boolean|string)', keyboard: 'boolean', focus: 'boolean', show: 'boolean'}, p = {HIDE: 'hide' + l, HIDDEN: 'hidden' + l, SHOW: 'show' + l, SHOWN: 'shown' + l, FOCUSIN: 'focusin' + l, RESIZE: 'resize' + l, CLICK_DISMISS: 'click.dismiss' + l, KEYDOWN_DISMISS: 'keydown.dismiss' + l, MOUSEUP_DISMISS: 'mouseup.dismiss' + l, MOUSEDOWN_DISMISS: 'mousedown.dismiss' + l, CLICK_DATA_API: 'click' + l + h}, m = {SCROLLBAR_MEASURER: 'modal-scrollbar-measure', BACKDROP: 'modal-backdrop', OPEN: 'modal-open', FADE: 'fade', SHOW: 'show'}, E = {DIALOG: '.modal-dialog', DATA_TOGGLE: '[data-toggle="modal"]', DATA_DISMISS: '[data-dismiss="modal"]', FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'}, v = (function () { function h (e, i) { n(this, h), this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(E.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0 } return h.prototype.toggle = function (t) { return this._isShown ? this.hide() : this.show(t) }, h.prototype.show = function (e) { var n = this; if (this._isTransitioning) throw new Error('Modal is transitioning'); r.supportsTransitionEnd() && t(this._element).hasClass(m.FADE) && (this._isTransitioning = !0); var i = t.Event(p.SHOW, {relatedTarget: e}); t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(m.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(p.CLICK_DISMISS, E.DATA_DISMISS, function (t) { return n.hide(t) }), t(this._dialog).on(p.MOUSEDOWN_DISMISS, function () { t(n._element).one(p.MOUSEUP_DISMISS, function (e) { t(e.target).is(n._element) && (n._ignoreBackdropClick = !0) }) }), this._showBackdrop(function () { return n._showElement(e) })) }, h.prototype.hide = function (e) { var n = this; if (e && e.preventDefault(), this._isTransitioning) throw new Error('Modal is transitioning'); var i = r.supportsTransitionEnd() && t(this._element).hasClass(m.FADE); i && (this._isTransitioning = !0); var o = t.Event(p.HIDE); t(this._element).trigger(o), this._isShown && !o.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(p.FOCUSIN), t(this._element).removeClass(m.SHOW), t(this._element).off(p.CLICK_DISMISS), t(this._dialog).off(p.MOUSEDOWN_DISMISS), i ? t(this._element).one(r.TRANSITION_END, function (t) { return n._hideModal(t) }).emulateTransitionEnd(u) : this._hideModal()) }, h.prototype.dispose = function () { t.removeData(this._element, a), t(window, document, this._element, this._backdrop).off(l), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null }, h.prototype._getConfig = function (n) { return n = t.extend({}, _, n), r.typeCheckConfig(e, n, g), n }, h.prototype._showElement = function (e) { var n = this, i = r.supportsTransitionEnd() && t(this._element).hasClass(m.FADE); this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = 'block', this._element.removeAttribute('aria-hidden'), this._element.scrollTop = 0, i && r.reflow(this._element), t(this._element).addClass(m.SHOW), this._config.focus && this._enforceFocus(); var o = t.Event(p.SHOWN, {relatedTarget: e}), s = function () { n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(o) }; i ? t(this._dialog).one(r.TRANSITION_END, s).emulateTransitionEnd(u) : s() }, h.prototype._enforceFocus = function () { var e = this; t(document).off(p.FOCUSIN).on(p.FOCUSIN, function (n) { document === n.target || e._element === n.target || t(e._element).has(n.target).length || e._element.focus() }) }, h.prototype._setEscapeEvent = function () { var e = this; this._isShown && this._config.keyboard ? t(this._element).on(p.KEYDOWN_DISMISS, function (t) { t.which === f && e.hide() }) : this._isShown || t(this._element).off(p.KEYDOWN_DISMISS) }, h.prototype._setResizeEvent = function () { var e = this; this._isShown ? t(window).on(p.RESIZE, function (t) { return e._handleUpdate(t) }) : t(window).off(p.RESIZE) }, h.prototype._hideModal = function () { var e = this; this._element.style.display = 'none', this._element.setAttribute('aria-hidden', 'true'), this._isTransitioning = !1, this._showBackdrop(function () { t(document.body).removeClass(m.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(p.HIDDEN) }) }, h.prototype._removeBackdrop = function () { this._backdrop && (t(this._backdrop).remove(), this._backdrop = null) }, h.prototype._showBackdrop = function (e) { var n = this, i = t(this._element).hasClass(m.FADE) ? m.FADE : ''; if (this._isShown && this._config.backdrop) { var o = r.supportsTransitionEnd() && i; if (this._backdrop = document.createElement('div'), this._backdrop.className = m.BACKDROP, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(p.CLICK_DISMISS, function (t) { return n._ignoreBackdropClick ? void (n._ignoreBackdropClick = !1) : void (t.target === t.currentTarget && (n._config.backdrop === 'static' ? n._element.focus() : n.hide())) }), o && r.reflow(this._backdrop), t(this._backdrop).addClass(m.SHOW), !e) return; if (!o) return void e(); t(this._backdrop).one(r.TRANSITION_END, e).emulateTransitionEnd(d) } else if (!this._isShown && this._backdrop) { t(this._backdrop).removeClass(m.SHOW); var s = function () { n._removeBackdrop(), e && e() }; r.supportsTransitionEnd() && t(this._element).hasClass(m.FADE) ? t(this._backdrop).one(r.TRANSITION_END, s).emulateTransitionEnd(d) : s() } else e && e() }, h.prototype._handleUpdate = function () { this._adjustDialog() }, h.prototype._adjustDialog = function () { var t = this._element.scrollHeight > document.documentElement.clientHeight; !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + 'px'), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + 'px') }, h.prototype._resetAdjustments = function () { this._element.style.paddingLeft = '', this._element.style.paddingRight = '' }, h.prototype._checkScrollbar = function () { this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth() }, h.prototype._setScrollbar = function () { var e = parseInt(t(E.FIXED_CONTENT).css('padding-right') || 0, 10); this._originalBodyPadding = document.body.style.paddingRight || '', this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + 'px') }, h.prototype._resetScrollbar = function () { document.body.style.paddingRight = this._originalBodyPadding }, h.prototype._getScrollbarWidth = function () { var t = document.createElement('div'); t.className = m.SCROLLBAR_MEASURER, document.body.appendChild(t); var e = t.offsetWidth - t.clientWidth; return document.body.removeChild(t), e }, h._jQueryInterface = function (e, n) { return this.each(function () { var o = t(this).data(a), r = t.extend({}, h.Default, t(this).data(), (typeof e === 'undefined' ? 'undefined' : i(e)) === 'object' && e); if (o || (o = new h(this, r), t(this).data(a, o)), typeof e === 'string') { if (void 0 === o[e]) throw new Error('No method named "' + e + '"'); o[e](n) } else r.show && o.show(n) }) }, o(h, null, [{key: 'VERSION', get: function () { return s }}, {key: 'Default', get: function () { return _ }}]), h }()); return t(document).on(p.CLICK_DATA_API, E.DATA_TOGGLE, function (e) { var n = this, i = void 0, o = r.getSelectorFromElement(this); o && (i = t(o)[0]); var s = t(i).data(a) ? 'toggle' : t.extend({}, t(i).data(), t(this).data()); this.tagName !== 'A' && this.tagName !== 'AREA' || e.preventDefault(); var l = t(i).one(p.SHOW, function (e) { e.isDefaultPrevented() || l.one(p.HIDDEN, function () { t(n).is(':visible') && n.focus() }) }); v._jQueryInterface.call(t(i), s, this) }), t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function () { return t.fn[e] = c, v._jQueryInterface }, v }(jQuery)), (function (t) {
      var e = 'scrollspy', s = '4.0.0-alpha.6', a = 'bs.scrollspy', l = '.' + a, h = '.data-api', c = t.fn[e], u = {offset: 10, method: 'auto', target: ''}, d = {offset: 'number', method: 'string', target: '(string|element)'}, f = {ACTIVATE: 'activate' + l, SCROLL: 'scroll' + l, LOAD_DATA_API: 'load' + l + h}, _ = {DROPDOWN_ITEM: 'dropdown-item', DROPDOWN_MENU: 'dropdown-menu', NAV_LINK: 'nav-link', NAV: 'nav', ACTIVE: 'active'}, g = {DATA_SPY: '[data-spy="scroll"]', ACTIVE: '.active', LIST_ITEM: '.list-item', LI: 'li', LI_DROPDOWN: 'li.dropdown', NAV_LINKS: '.nav-link', DROPDOWN: '.dropdown', DROPDOWN_ITEMS: '.dropdown-item', DROPDOWN_TOGGLE: '.dropdown-toggle'}, p = {OFFSET: 'offset', POSITION: 'position'}, m = (function () {
          function h (e, i) { var o = this; n(this, h), this._element = e, this._scrollElement = e.tagName === 'BODY' ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + ' ' + g.NAV_LINKS + ',' + (this._config.target + ' ' + g.DROPDOWN_ITEMS), this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(f.SCROLL, function (t) { return o._process(t) }), this.refresh(), this._process() } return h.prototype.refresh = function () { var e = this, n = this._scrollElement !== this._scrollElement.window ? p.POSITION : p.OFFSET, i = this._config.method === 'auto' ? n : this._config.method, o = i === p.POSITION ? this._getScrollTop() : 0; this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(); var s = t.makeArray(t(this._selector)); s.map(function (e) { var n = void 0, s = r.getSelectorFromElement(e); return s && (n = t(s)[0]), n && (n.offsetWidth || n.offsetHeight) ? [t(n)[i]().top + o, s] : null }).filter(function (t) { return t }).sort(function (t, e) { return t[0] - e[0] }).forEach(function (t) { e._offsets.push(t[0]), e._targets.push(t[1]) }) }, h.prototype.dispose = function () { t.removeData(this._element, a), t(this._scrollElement).off(l), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null }, h.prototype._getConfig = function (n) { if (n = t.extend({}, u, n), typeof n.target !== 'string') { var i = t(n.target).attr('id'); i || (i = r.getUID(e), t(n.target).attr('id', i)), n.target = '#' + i } return r.typeCheckConfig(e, n, d), n }, h.prototype._getScrollTop = function () { return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop }, h.prototype._getScrollHeight = function () { return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, h.prototype._getOffsetHeight = function () { return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight }, h.prototype._process = function () { var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(), n = this._config.offset + e - this._getOffsetHeight(); if (this._scrollHeight !== e && this.refresh(), t >= n) { var i = this._targets[this._targets.length - 1]; return void (this._activeTarget !== i && this._activate(i)) } if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear(); for (var o = this._offsets.length; o--;) { var r = this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]); r && this._activate(this._targets[o]) } }, h.prototype._activate = function (e) { this._activeTarget = e, this._clear(); var n = this._selector.split(','); n = n.map(function (t) { return t + '[data-target="' + e + '"],' + (t + '[href="' + e + '"]') }); var i = t(n.join(',')); i.hasClass(_.DROPDOWN_ITEM) ? (i.closest(g.DROPDOWN).find(g.DROPDOWN_TOGGLE).addClass(_.ACTIVE), i.addClass(_.ACTIVE)) : i.parents(g.LI).find('> ' + g.NAV_LINKS).addClass(_.ACTIVE), t(this._scrollElement).trigger(f.ACTIVATE, {relatedTarget: e}) }, h.prototype._clear = function () { t(this._selector).filter(g.ACTIVE).removeClass(_.ACTIVE) }, h._jQueryInterface = function (e) {
            return this.each(function () {
              var n = t(this).data(a), o = (typeof e === 'undefined' ? 'undefined' : i(e)) === 'object' && e
              if (n || (n = new h(this, o), t(this).data(a, n)), typeof e === 'string') { if (void 0 === n[e]) throw new Error('No method named "' + e + '"'); n[e]() }
            })
          }, o(h, null, [{key: 'VERSION', get: function () { return s }}, {key: 'Default', get: function () { return u }}]), h
        }()); return t(window).on(f.LOAD_DATA_API, function () { for (var e = t.makeArray(t(g.DATA_SPY)), n = e.length; n--;) { var i = t(e[n]); m._jQueryInterface.call(i, i.data()) } }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () { return t.fn[e] = c, m._jQueryInterface }, m
    }(jQuery)), (function (t) { var e = 'tab', i = '4.0.0-alpha.6', s = 'bs.tab', a = '.' + s, l = '.data-api', h = t.fn[e], c = 150, u = {HIDE: 'hide' + a, HIDDEN: 'hidden' + a, SHOW: 'show' + a, SHOWN: 'shown' + a, CLICK_DATA_API: 'click' + a + l}, d = {DROPDOWN_MENU: 'dropdown-menu', ACTIVE: 'active', DISABLED: 'disabled', FADE: 'fade', SHOW: 'show'}, f = {A: 'a', LI: 'li', DROPDOWN: '.dropdown', LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)', FADE_CHILD: '> .nav-item .fade, > .fade', ACTIVE: '.active', ACTIVE_CHILD: '> .nav-item > .active, > .active', DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]', DROPDOWN_TOGGLE: '.dropdown-toggle', DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'}, _ = (function () { function e (t) { n(this, e), this._element = t } return e.prototype.show = function () { var e = this; if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(d.ACTIVE) || t(this._element).hasClass(d.DISABLED))) { var n = void 0, i = void 0, o = t(this._element).closest(f.LIST)[0], s = r.getSelectorFromElement(this._element); o && (i = t.makeArray(t(o).find(f.ACTIVE)), i = i[i.length - 1]); var a = t.Event(u.HIDE, {relatedTarget: this._element}), l = t.Event(u.SHOW, {relatedTarget: i}); if (i && t(i).trigger(a), t(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) { s && (n = t(s)[0]), this._activate(this._element, o); var h = function () { var n = t.Event(u.HIDDEN, {relatedTarget: e._element}), o = t.Event(u.SHOWN, {relatedTarget: i}); t(i).trigger(n), t(e._element).trigger(o) }; n ? this._activate(n, n.parentNode, h) : h() } } }, e.prototype.dispose = function () { t.removeClass(this._element, s), this._element = null }, e.prototype._activate = function (e, n, i) { var o = this, s = t(n).find(f.ACTIVE_CHILD)[0], a = i && r.supportsTransitionEnd() && (s && t(s).hasClass(d.FADE) || Boolean(t(n).find(f.FADE_CHILD)[0])), l = function () { return o._transitionComplete(e, s, a, i) }; s && a ? t(s).one(r.TRANSITION_END, l).emulateTransitionEnd(c) : l(), s && t(s).removeClass(d.SHOW) }, e.prototype._transitionComplete = function (e, n, i, o) { if (n) { t(n).removeClass(d.ACTIVE); var s = t(n.parentNode).find(f.DROPDOWN_ACTIVE_CHILD)[0]; s && t(s).removeClass(d.ACTIVE), n.setAttribute('aria-expanded', !1) } if (t(e).addClass(d.ACTIVE), e.setAttribute('aria-expanded', !0), i ? (r.reflow(e), t(e).addClass(d.SHOW)) : t(e).removeClass(d.FADE), e.parentNode && t(e.parentNode).hasClass(d.DROPDOWN_MENU)) { var a = t(e).closest(f.DROPDOWN)[0]; a && t(a).find(f.DROPDOWN_TOGGLE).addClass(d.ACTIVE), e.setAttribute('aria-expanded', !0) }o && o() }, e._jQueryInterface = function (n) { return this.each(function () { var i = t(this), o = i.data(s); if (o || (o = new e(this), i.data(s, o)), typeof n === 'string') { if (void 0 === o[n]) throw new Error('No method named "' + n + '"'); o[n]() } }) }, o(e, null, [{key: 'VERSION', get: function () { return i }}]), e }()); return t(document).on(u.CLICK_DATA_API, f.DATA_TOGGLE, function (e) { e.preventDefault(), _._jQueryInterface.call(t(this), 'show') }), t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function () { return t.fn[e] = h, _._jQueryInterface }, _ }(jQuery)), (function (t) { if (typeof Tether === 'undefined') throw new Error('Bootstrap tooltips require Tether (http://tether.io/)'); var e = 'tooltip', s = '4.0.0-alpha.6', a = 'bs.tooltip', l = '.' + a, h = t.fn[e], c = 150, u = 'bs-tether', d = {animation: !0, template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>', trigger: 'hover focus', title: '', delay: 0, html: !1, selector: !1, placement: 'top', offset: '0 0', constraints: [], container: !1}, f = {animation: 'boolean', template: 'string', title: '(string|element|function)', trigger: 'string', delay: '(number|object)', html: 'boolean', selector: '(string|boolean)', placement: '(string|function)', offset: 'string', constraints: 'array', container: '(string|element|boolean)'}, _ = {TOP: 'bottom center', RIGHT: 'middle left', BOTTOM: 'top center', LEFT: 'middle right'}, g = {SHOW: 'show', OUT: 'out'}, p = {HIDE: 'hide' + l, HIDDEN: 'hidden' + l, SHOW: 'show' + l, SHOWN: 'shown' + l, INSERTED: 'inserted' + l, CLICK: 'click' + l, FOCUSIN: 'focusin' + l, FOCUSOUT: 'focusout' + l, MOUSEENTER: 'mouseenter' + l, MOUSELEAVE: 'mouseleave' + l}, m = {FADE: 'fade', SHOW: 'show'}, E = {TOOLTIP: '.tooltip', TOOLTIP_INNER: '.tooltip-inner'}, v = {element: !1, enabled: !1}, T = {HOVER: 'hover', FOCUS: 'focus', CLICK: 'click', MANUAL: 'manual'}, I = (function () { function h (t, e) { n(this, h), this._isEnabled = !0, this._timeout = 0, this._hoverState = '', this._activeTrigger = {}, this._isTransitioning = !1, this._tether = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners() } return h.prototype.enable = function () { this._isEnabled = !0 }, h.prototype.disable = function () { this._isEnabled = !1 }, h.prototype.toggleEnabled = function () { this._isEnabled = !this._isEnabled }, h.prototype.toggle = function (e) { if (e) { var n = this.constructor.DATA_KEY, i = t(e.currentTarget).data(n); i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i) } else { if (t(this.getTipElement()).hasClass(m.SHOW)) return void this._leave(null, this); this._enter(null, this) } }, h.prototype.dispose = function () { clearTimeout(this._timeout), this.cleanupTether(), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest('.modal').off('hide.bs.modal'), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null }, h.prototype.show = function () { var e = this; if (t(this.element).css('display') === 'none') throw new Error('Please use show on visible elements'); var n = t.Event(this.constructor.Event.SHOW); if (this.isWithContent() && this._isEnabled) { if (this._isTransitioning) throw new Error('Tooltip is transitioning'); t(this.element).trigger(n); var i = t.contains(this.element.ownerDocument.documentElement, this.element); if (n.isDefaultPrevented() || !i) return; var o = this.getTipElement(), s = r.getUID(this.constructor.NAME); o.setAttribute('id', s), this.element.setAttribute('aria-describedby', s), this.setContent(), this.config.animation && t(o).addClass(m.FADE); var a = typeof this.config.placement === 'function' ? this.config.placement.call(this, o, this.element) : this.config.placement, l = this._getAttachment(a), c = this.config.container === !1 ? document.body : t(this.config.container); t(o).data(this.constructor.DATA_KEY, this).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({attachment: l, element: o, target: this.element, classes: v, classPrefix: u, offset: this.config.offset, constraints: this.config.constraints, addTargetClasses: !1}), r.reflow(o), this._tether.position(), t(o).addClass(m.SHOW); var d = function () { var n = e._hoverState; e._hoverState = null, e._isTransitioning = !1, t(e.element).trigger(e.constructor.Event.SHOWN), n === g.OUT && e._leave(null, e) }; if (r.supportsTransitionEnd() && t(this.tip).hasClass(m.FADE)) return this._isTransitioning = !0, void t(this.tip).one(r.TRANSITION_END, d).emulateTransitionEnd(h._TRANSITION_DURATION); d() } }, h.prototype.hide = function (e) { var n = this, i = this.getTipElement(), o = t.Event(this.constructor.Event.HIDE); if (this._isTransitioning) throw new Error('Tooltip is transitioning'); var s = function () { n._hoverState !== g.SHOW && i.parentNode && i.parentNode.removeChild(i), n.element.removeAttribute('aria-describedby'), t(n.element).trigger(n.constructor.Event.HIDDEN), n._isTransitioning = !1, n.cleanupTether(), e && e() }; t(this.element).trigger(o), o.isDefaultPrevented() || (t(i).removeClass(m.SHOW), this._activeTrigger[T.CLICK] = !1, this._activeTrigger[T.FOCUS] = !1, this._activeTrigger[T.HOVER] = !1, r.supportsTransitionEnd() && t(this.tip).hasClass(m.FADE) ? (this._isTransitioning = !0, t(i).one(r.TRANSITION_END, s).emulateTransitionEnd(c)) : s(), this._hoverState = '') }, h.prototype.isWithContent = function () { return Boolean(this.getTitle()) }, h.prototype.getTipElement = function () { return this.tip = this.tip || t(this.config.template)[0] }, h.prototype.setContent = function () { var e = t(this.getTipElement()); this.setElementContent(e.find(E.TOOLTIP_INNER), this.getTitle()), e.removeClass(m.FADE + ' ' + m.SHOW), this.cleanupTether() }, h.prototype.setElementContent = function (e, n) { var o = this.config.html; (typeof n === 'undefined' ? 'undefined' : i(n)) === 'object' && (n.nodeType || n.jquery) ? o ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[o ? 'html' : 'text'](n) }, h.prototype.getTitle = function () { var t = this.element.getAttribute('data-original-title'); return t || (t = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title), t }, h.prototype.cleanupTether = function () { this._tether && this._tether.destroy() }, h.prototype._getAttachment = function (t) { return _[t.toUpperCase()] }, h.prototype._setListeners = function () { var e = this, n = this.config.trigger.split(' '); n.forEach(function (n) { if (n === 'click')t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) { return e.toggle(t) }); else if (n !== T.MANUAL) { var i = n === T.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN, o = n === T.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT; t(e.element).on(i, e.config.selector, function (t) { return e._enter(t) }).on(o, e.config.selector, function (t) { return e._leave(t) }) }t(e.element).closest('.modal').on('hide.bs.modal', function () { return e.hide() }) }), this.config.selector ? this.config = t.extend({}, this.config, {trigger: 'manual', selector: ''}) : this._fixTitle() }, h.prototype._fixTitle = function () { var t = i(this.element.getAttribute('data-original-title')); (this.element.getAttribute('title') || t !== 'string') && (this.element.setAttribute('data-original-title', this.element.getAttribute('title') || ''), this.element.setAttribute('title', '')) }, h.prototype._enter = function (e, n) { var i = this.constructor.DATA_KEY; return n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger[e.type === 'focusin' ? T.FOCUS : T.HOVER] = !0), t(n.getTipElement()).hasClass(m.SHOW) || n._hoverState === g.SHOW ? void (n._hoverState = g.SHOW) : (clearTimeout(n._timeout), n._hoverState = g.SHOW, n.config.delay && n.config.delay.show ? void (n._timeout = setTimeout(function () { n._hoverState === g.SHOW && n.show() }, n.config.delay.show)) : void n.show()) }, h.prototype._leave = function (e, n) { var i = this.constructor.DATA_KEY; if (n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger[e.type === 'focusout' ? T.FOCUS : T.HOVER] = !1), !n._isWithActiveTrigger()) return clearTimeout(n._timeout), n._hoverState = g.OUT, n.config.delay && n.config.delay.hide ? void (n._timeout = setTimeout(function () { n._hoverState === g.OUT && n.hide() }, n.config.delay.hide)) : void n.hide() }, h.prototype._isWithActiveTrigger = function () { for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0; return !1 }, h.prototype._getConfig = function (n) { return n = t.extend({}, this.constructor.Default, t(this.element).data(), n), n.delay && typeof n.delay === 'number' && (n.delay = {show: n.delay, hide: n.delay}), r.typeCheckConfig(e, n, this.constructor.DefaultType), n }, h.prototype._getDelegateConfig = function () { var t = {}; if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]); return t }, h._jQueryInterface = function (e) { return this.each(function () { var n = t(this).data(a), o = (typeof e === 'undefined' ? 'undefined' : i(e)) === 'object' && e; if ((n || !/dispose|hide/.test(e)) && (n || (n = new h(this, o), t(this).data(a, n)), typeof e === 'string')) { if (void 0 === n[e]) throw new Error('No method named "' + e + '"'); n[e]() } }) }, o(h, null, [{key: 'VERSION', get: function () { return s }}, {key: 'Default', get: function () { return d }}, {key: 'NAME', get: function () { return e }}, {key: 'DATA_KEY', get: function () { return a }}, {key: 'Event', get: function () { return p }}, {key: 'EVENT_KEY', get: function () { return l }}, {key: 'DefaultType', get: function () { return f }}]), h }()); return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function () { return t.fn[e] = h, I._jQueryInterface }, I }(jQuery))); (function (r) { var a = 'popover', l = '4.0.0-alpha.6', h = 'bs.popover', c = '.' + h, u = r.fn[a], d = r.extend({}, s.Default, {placement: 'right', trigger: 'click', content: '', template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), f = r.extend({}, s.DefaultType, {content: '(string|element|function)'}), _ = {FADE: 'fade', SHOW: 'show'}, g = {TITLE: '.popover-title', CONTENT: '.popover-content'}, p = {HIDE: 'hide' + c, HIDDEN: 'hidden' + c, SHOW: 'show' + c, SHOWN: 'shown' + c, INSERTED: 'inserted' + c, CLICK: 'click' + c, FOCUSIN: 'focusin' + c, FOCUSOUT: 'focusout' + c, MOUSEENTER: 'mouseenter' + c, MOUSELEAVE: 'mouseleave' + c}, m = (function (s) { function u () { return n(this, u), t(this, s.apply(this, arguments)) } return e(u, s), u.prototype.isWithContent = function () { return this.getTitle() || this._getContent() }, u.prototype.getTipElement = function () { return this.tip = this.tip || r(this.config.template)[0] }, u.prototype.setContent = function () { var t = r(this.getTipElement()); this.setElementContent(t.find(g.TITLE), this.getTitle()), this.setElementContent(t.find(g.CONTENT), this._getContent()), t.removeClass(_.FADE + ' ' + _.SHOW), this.cleanupTether() }, u.prototype._getContent = function () { return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content) }, u._jQueryInterface = function (t) { return this.each(function () { var e = r(this).data(h), n = (typeof t === 'undefined' ? 'undefined' : i(t)) === 'object' ? t : null; if ((e || !/destroy|hide/.test(t)) && (e || (e = new u(this, n), r(this).data(h, e)), typeof t === 'string')) { if (void 0 === e[t]) throw new Error('No method named "' + t + '"'); e[t]() } }) }, o(u, null, [{key: 'VERSION', get: function () { return l }}, {key: 'Default', get: function () { return d }}, {key: 'NAME', get: function () { return a }}, {key: 'DATA_KEY', get: function () { return h }}, {key: 'Event', get: function () { return p }}, {key: 'EVENT_KEY', get: function () { return c }}, {key: 'DefaultType', get: function () { return f }}]), u }(s)); return r.fn[a] = m._jQueryInterface, r.fn[a].Constructor = m, r.fn[a].noConflict = function () { return r.fn[a] = u, m._jQueryInterface }, m })(jQuery)
}())

// # sourceMappingURL=main.js.map