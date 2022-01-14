import {isArray, isEmpty } from 'lodash'
import {sanitize} from '../../../utils/miscellaneous';
import Link from 'next/link';
import {getIconComponentByName} from "../../../utils/icons-map";
const Footer = ({footer, footerMenus}) => {
    if(isEmpty(footerMenus) || ! isArray( footerMenus)){
        return null;
    }
    return (
        <footer className="bg-teal-500 p-6" >
        <div className="flex flex-wrap -mx-1 overflow-hidden text-white">
            <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3 ">
        <div dangerouslySetInnerHTML={{ __html:sanitize(footer?.sidebarOne) }}></div>
            </div>
            <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
            <div dangerouslySetInnerHTML={{ __html:sanitize(footer?.sidebarTwo) }}></div>
            </div>
            <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
            { ! isEmpty(footerMenus) && isArray(footerMenus) ? (
                <ul>
                    {footerMenus.map( footerMenus =>(
                        <li key={footerMenus?.node?.id}>
                            <Link href={footerMenus?.node?.path}>
                                <a>
                                    {footerMenus?.node?.label}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            ): null}
            </div>
        </div>
        <div >{footer?.copyrightText ? footer.copyrightText : '@ shyju tested 2022'}</div>
        <div>
            {! isEmpty( footer?.socialLinks) && isArray(footer?.socialLinks) ? (
                <ul>
                    {footer.socialLinks.map( socialLink =>(
                        <li key={socialLink?.iconName}>
                            <a href={ socialLink?.iconUrl }>
                                {getIconComponentByName( socialLink?.iconName )}
                            </a>
                        </li>
                    ))}
                </ul>
            ):null}
        </div>
        </footer>
    )
}
export default Footer

