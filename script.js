
(function () {
  'use strict';

  var APP_KEY = 'webapp_myAppsBuddy';
  var APP_VERSION = '001.001';
  var ICONS = Buddy.ICONS;

  var modalApi = Buddy.modal.init();
  var openModal = modalApi.open;
  var closeModal = modalApi.close;

  function openSettingsModal() {
    Buddy.settings.open(APP_KEY, openModal, closeModal, { appVersion: APP_VERSION });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btnSettings = document.getElementById('btnSettings');
    if (!btnSettings) return;
    btnSettings.innerHTML = ICONS.settings;
    btnSettings.addEventListener('click', openSettingsModal);
  });

  function initRibbonCycles() {
    document.querySelectorAll('.app-tile-ribbon-cycle[data-ribbon-states]').forEach(function (ribbon) {
      var states = ribbon.getAttribute('data-ribbon-states').split(',').map(function (s) { return s.trim(); });
      if (states.length < 2) return;
      var index = 0;
      setInterval(function () {
        index = (index + 1) % states.length;
        var next = states[index];
        ribbon.textContent = next;
        ribbon.classList.remove('is-new', 'is-beta');
        ribbon.classList.add('is-' + next.toLowerCase());
        ribbon.classList.remove('pulse');
        void ribbon.offsetWidth;
        ribbon.classList.add('pulse');
      }, 2500);
    });
  }

  document.addEventListener('DOMContentLoaded', initRibbonCycles);

  function getHeartBurstLayer() {
    var layer = document.getElementById('heartBurstLayer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'heartBurstLayer';
      layer.className = 'heart-burst-layer';
      document.body.appendChild(layer);
    }
    return layer;
  }

  function spawnHeartBurst(x, y) {
    var layer = getHeartBurstLayer();
    var count = 14;
    for (var i = 0; i < count; i++) {
      var particle = document.createElement('span');
      particle.className = 'heart-particle';
      particle.innerHTML = Buddy.ICONS.heartFilled;

      var size = Math.round(12 + Math.random() * 14);
      var driftX = Math.round(Math.random() * 160 - 80);
      var fallY = Math.round(120 + Math.random() * 120);
      var rotate = Math.round(Math.random() * 70 - 35);
      var duration = Math.round(900 + Math.random() * 700);
      var delay = Math.round(Math.random() * 150);

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.setProperty('--drift-x', driftX + 'px');
      particle.style.setProperty('--fall-y', fallY + 'px');
      particle.style.setProperty('--rotate', rotate + 'deg');
      particle.style.animationDuration = duration + 'ms';
      particle.style.animationDelay = delay + 'ms';

      particle.addEventListener('animationend', function () {
        this.remove();
      });

      layer.appendChild(particle);
    }
  }

  function spawnThankYouText(x, y) {
    var layer = getHeartBurstLayer();
    var el = document.createElement('span');
    el.className = 'thank-you-text';
    el.textContent = 'Thank you!';
    el.style.left = x + 'px';
    el.style.top = (y - 15) + 'px';
    el.addEventListener('animationend', function () {
      this.remove();
    });
    layer.appendChild(el);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var heartTrigger = document.getElementById('heartTrigger');
    if (!heartTrigger) return;
    heartTrigger.addEventListener('click', function (e) {
      var rect = e.currentTarget.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      spawnHeartBurst(x, y);
      spawnThankYouText(x, y);
    });
  });
})();
