import React from 'react'
import Box from '../Box/Box'
import CtaButton from '../Cta/CtaButton'
import List from '../List/List'
import Typography from '../Typography/Typography'

const Breadcrumb = ({value,heading}) => {
  return (
    <>
      <Box.Section className="py-5 sm:py-7 bg-blue-100">
   <Box className="container max-w-screen-xl mx-auto px-4">
      <Typography component={'h2'} className="text-3xl font-semibold mb-2">{heading}</Typography>
      <List className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
         <List.Item className="inline-flex items-center">
            <CtaButton className="text-gray-600 hover:text-blue-600" to="/">Home</CtaButton>  
            <i className="ml-3 text-gray-400 fa fa-chevron-right"></i>
         </List.Item>
         <List.Item className="inline-flex items-center" aria-current="page">
            <CtaButton className="text-gray-600 hover:text-blue-600" to="#">{value}</CtaButton> 
            {/* <i className="ml-3 text-gray-400  fa fa-chevron-right"></i> */}
         </List.Item>
         {/* <li className="inline-flex items-center"> Men’s wear </li> */}
      </List>
   </Box>
</Box.Section>
    </>
  )
}

export default Breadcrumb
