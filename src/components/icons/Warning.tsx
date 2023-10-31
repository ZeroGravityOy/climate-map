import * as React from 'react'
import type { SVGProps } from 'react'

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M11.8329 17.5834C12.1206 17.5834 12.3619 17.4861 12.5568 17.2914C12.7517 17.0968 12.8491 16.8556 12.8491 16.5679C12.8491 16.2802 12.7518 16.0389 12.5571 15.844C12.3625 15.6492 12.1213 15.5517 11.8336 15.5517C11.5459 15.5517 11.3046 15.649 11.1097 15.8437C10.9149 16.0383 10.8174 16.2795 10.8174 16.5672C10.8174 16.8549 10.9147 17.0962 11.1094 17.2911C11.304 17.4859 11.5452 17.5834 11.8329 17.5834ZM10.9324 13.1176H12.8491V5.96837H10.9324V13.1176ZM11.8383 23.3334C10.2509 23.3334 8.75912 23.0315 7.36294 22.4277C5.96677 21.824 4.74798 21.0014 3.70658 19.9601C2.66519 18.9186 1.84263 17.6994 1.23888 16.3023C0.635127 14.9051 0.333252 13.4123 0.333252 11.8238C0.333252 10.2353 0.635127 8.74244 1.23888 7.34533C1.84263 5.94819 2.66519 4.73212 3.70658 3.69712C4.74798 2.66212 5.96724 1.84275 7.36435 1.239C8.76149 0.635249 10.2543 0.333374 11.8428 0.333374C13.4314 0.333374 14.9242 0.635249 16.3213 1.239C17.7184 1.84275 18.9345 2.66212 19.9695 3.69712C21.0045 4.73212 21.8239 5.94921 22.4276 7.34837C23.0314 8.74754 23.3333 10.2408 23.3333 11.8283C23.3333 13.4157 23.0314 14.9075 22.4276 16.3037C21.8239 17.6999 21.0045 18.9175 19.9695 19.9565C18.9345 20.9955 17.7174 21.8181 16.3183 22.4242C14.9191 23.0303 13.4258 23.3334 11.8383 23.3334ZM11.8428 21.4167C14.507 21.4167 16.7687 20.4839 18.6279 18.6184C20.487 16.7528 21.4166 14.488 21.4166 11.8238C21.4166 9.15963 20.4882 6.89796 18.6314 5.03877C16.7747 3.17961 14.5086 2.25002 11.8333 2.25002C9.17547 2.25002 6.9138 3.17841 5.04825 5.03518C3.18268 6.89197 2.2499 9.15803 2.2499 11.8334C2.2499 14.4912 3.18268 16.7528 5.04825 18.6184C6.9138 20.4839 9.17866 21.4167 11.8428 21.4167Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgWarning
