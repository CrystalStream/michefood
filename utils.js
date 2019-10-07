/**
 * Utils
*/

const BOT_OPTIONS = [
  'add'
]

function validateFbURL (url) {
  const pattern = new RegExp('^(https?://www.facebook.com/.{3,})', 'gi')

  return pattern.test(url)
}

function createPlacesMessage (places) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Hey!!! Hora de la papa! Aqui hay algunas opciones'
      }
    },
    {
      type: 'divider'
    }
  ]

  places.forEach((place) => {
    const block = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${place.facebookUrl || '#'}|${place.name}>*\n ${place.description || 'Sin descripción'}\n Tel.: ${place.phone || ':sad:'}`
      },
      accessory: {
        type: 'image',
        image_url: place.cover || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png',
        alt_text: place.name
      }
    }

    const location = {
      type: 'context',
      elements: [
        {
          type: 'image',
          image_url: 'https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png',
          alt_text: 'Location Pin Icon'
        },
        {
          type: 'plain_text',
          emoji: true,
          text: place.address || ':sad:'
        }
      ]
    }

    const divider = {
      type: 'divider'
    }

    blocks.push(block, location, divider)
  })

  return JSON.stringify(blocks)
}

module.exports = {
  BOT_OPTIONS,
  validateFbURL,
  createPlacesMessage
}
