const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const resultData = {
  carla: {
    src: './static/images/carla_quali.jpg',
    alt: 'CERPE qualitative results in CARLA',
    caption: 'CARLA encounters transition between overlapping and non-overlapping views as vehicles cross an intersection. CERPE maintains a temporally stable relative trajectory through the transition.',
  },
  mars: {
    src: './static/images/mars_quali.jpg',
    alt: 'CERPE qualitative results in the OpenMars real-world driving dataset',
    caption: 'OpenMars contains longer trajectories and extended low-overlap periods. Direct estimates correct accumulated drift when overlap resumes.',
  },
  robots: {
    src: './static/images/physical_robot_team.jpg',
    alt: 'CERPE qualitative results on indoor physical robot teams',
    caption: 'Indoor teams introduce close-range perspective changes, occlusion, and dynamic objects. Quantitative accuracy is measured on mocap-covered samples.',
  },
};

const resultImage = document.querySelector('#result-image');
const resultCaption = document.querySelector('#result-caption');
const resultTabs = document.querySelectorAll('.result-tab');

resultTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const result = resultData[tab.dataset.result];
    if (!result || !resultImage || !resultCaption) return;

    resultTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
    });

    resultImage.src = result.src;
    resultImage.alt = result.alt;
    resultCaption.textContent = result.caption;
  });
});

const deploymentVideos = [
  {
    src: 'https://www.youtube-nocookie.com/embed/f-IYKQ4XJKs?rel=0',
    title: 'CERPE Demo Campus 01',
    caption: 'CERPE Campus 01 demonstration.',
  },
  {
    src: 'https://www.youtube-nocookie.com/embed/tF44yfTIi_E?rel=0',
    title: 'CERPE Demo Campus 02',
    caption: 'CERPE Campus 02 demonstration.',
  },
  {
    src: 'https://www.youtube-nocookie.com/embed/WJws7E5LPLE?rel=0',
    title: 'CERPE Demo Campus 03',
    caption: 'CERPE Campus 03 demonstration.',
  },
  {
    src: 'https://www.youtube-nocookie.com/embed/l08B09iKrHo?rel=0',
    title: 'CERPE Demo Join Team',
    caption: 'CERPE Join Team demonstration.',
  },
];

const deploymentVideo = document.querySelector('#deployment-video');
const deploymentVideoCaption = document.querySelector('#deployment-video-caption');
const deploymentVideoTabs = document.querySelectorAll('.video-tab');
const deploymentVideoArrows = document.querySelectorAll('.video-arrow');
let activeDeploymentVideo = 0;

const showDeploymentVideo = (index) => {
  if (!deploymentVideo || !deploymentVideoCaption) return;

  activeDeploymentVideo = (index + deploymentVideos.length) % deploymentVideos.length;
  const selectedVideo = deploymentVideos[activeDeploymentVideo];

  deploymentVideo.src = selectedVideo.src;
  deploymentVideo.title = selectedVideo.title;
  deploymentVideoCaption.textContent = selectedVideo.caption;

  deploymentVideoTabs.forEach((tab) => {
    const selected = Number(tab.dataset.videoIndex) === activeDeploymentVideo;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
};

deploymentVideoTabs.forEach((tab) => {
  tab.addEventListener('click', () => showDeploymentVideo(Number(tab.dataset.videoIndex)));
});

deploymentVideoArrows.forEach((arrow) => {
  arrow.addEventListener('click', () => showDeploymentVideo(activeDeploymentVideo + Number(arrow.dataset.videoStep)));
});

const copyButton = document.querySelector('.copy-button');
const copyStatus = document.querySelector('.copy-status');

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const target = document.getElementById(copyButton.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent);
      copyButton.textContent = 'Copied';
      if (copyStatus) copyStatus.textContent = 'BibTeX copied to clipboard.';
      window.setTimeout(() => {
        copyButton.textContent = 'Copy';
        if (copyStatus) copyStatus.textContent = '';
      }, 1800);
    } catch (error) {
      if (copyStatus) copyStatus.textContent = 'Select the citation text to copy it.';
    }
  });
}
