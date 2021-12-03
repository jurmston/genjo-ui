import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { colors, fontFamilyMono } from '../ThemeProvider'


const colorNames = {
  slate: 'Slate',
  grey: 'Grey',
  zinc: 'Zinc',
  neutral: 'Neutral',
  stone: 'Stone',
  red: 'Red',
  orange: 'Orange',
  amber: 'Amber',
  yellow: 'Yellow',
  lime: 'Lime',
  green: 'Green',
  emerald: 'Emerald',
  teal: 'Teal',
  cyan: 'Cyan',
  sky: 'Sky',
  blue: 'Blue',
  indigo: 'Indigo',
  violet: 'Violet',
  purple: 'Purple',
  fuchsia: 'Fuchsia',
  pink: 'Pink',
  rose: 'Rose',
}

const variants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Styles/Colors',
}

function ColorDisplay({ color, variant, index }) {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gridArea: `color-${index}`,
        gap: 4,
      }}
    >
      <div
        style={{
          backgroundColor: colors[color][variant],
          flex: 1,
          borderRadius: 8,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12 }}><strong>{variant}</strong></span>
        <span
          style={{
            fontSize: 12,
            fontFamily: fontFamilyMono,
            color: colors.grey[500],
          }}
        >
          {colors[color][variant]}
        </span>
      </div>
    </div>

  )
}


function ColorGroup({ color }) {
  const title = colorNames[color]

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <div
        style={{
          marginBottom: 24,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '0.5fr repeat(5, 1fr)',
          gridTemplateRows: '5em 5em',
          gridTemplateAreas: `
            "color-0 color-1 color-2 color-3 color-4"
            "color-5 color-6 color-7 color-8 color-9"
          `,
          gap: 8,
        }}
      >
        {variants.map((variant, index) => (
          <ColorDisplay
            key={variant}
            color={color}
            variant={variant}
            index={index}
          />
        ))}
      </div>
    </>
  )
}

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = () => {

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <h3>Colors</h3>
        <p>
          Inspired by Material Design (@mui) and Tailwind palettes.
        </p>
      </div>

      <Container maxWidth="sm">
        {Object.keys(colorNames).map(color => (
          <ColorGroup key={color.value} color={color} />
        ))}
      </Container>
    </div>
  )
}
