import React, { AnchorHTMLAttributes } from 'react'
import { usePageContext } from './usePageContext'

export { Link }

function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pageContext = usePageContext()
  const className = [props.className, pageContext.urlPathname === props.href && 'is-active'].filter(Boolean).join(' ')
  return <a {...props} className={className} />
}
