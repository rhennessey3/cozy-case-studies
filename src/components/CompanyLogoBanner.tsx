
import React from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoBannerProps {
  className?: string;
}

const CompanyLogoBanner: React.FC<CompanyLogoBannerProps> = ({
  className,
}) => {
  // Array of company logos with SVG data
  const companies = [
    {
      name: 'Microsoft',
      svg: (
        <svg viewBox="0 0 23 23" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 0H0V11H11V0Z" fill="#333333"/>
          <path d="M23 0H12V11H23V0Z" fill="#333333"/>
          <path d="M11 12H0V23H11V12Z" fill="#333333"/>
          <path d="M23 12H12V23H23V12Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Adobe',
      svg: (
        <svg viewBox="0 0 50 50" className="h-8 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.985 34.5H15.255L13.5 39H9L16.5 17.25H18.825L26.25 39H21.75L19.985 34.5ZM16.5 30.75H18.75L17.625 27.375L16.5 30.75Z" fill="#333333"/>
          <path d="M34.5 39H30.75V17.25H34.5V39Z" fill="#333333"/>
          <path d="M41.25 17.25V39H37.5V17.25H41.25Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Custom Logo',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.953125 -2.0967725 51.59375 12.580635" className="h-8 w-20">
          <g fill="#333333">
            <path d="M5.5826 0C2.51343 0 0 1.85198 0 4.1274c0 2.27542 2.51343 4.25969 5.5826 4.25969 3.09562 0 5.60948-1.98427 5.60948-4.2597C11.19208 1.85199 8.67822 0 5.5826 0zm0 .29094c2.6723 0 4.84209 1.71979 4.84209 3.83646S8.25489 8.09615 5.5826 8.09615.74104 6.24407.74104 4.1274 2.91031.29094 5.5826.29094zm9.89552 1.37614L12.0122 6.98511h1.19062l.87282-1.37615H16.06v1.37615h1.11156V1.66708zm.58188.89917v2.11667h-1.37563C14.79021 4.55063 16.06 2.56625 16.06 2.56625zm23.17791 3.54552c-.26458 0-.4501.18551-.4501.4501 0 .23812.18552.42324.4501.42324.26458 0 .44959-.18512.44959-.42324 0-.26459-.185-.4501-.44959-.4501zm0 .05323c.21167 0 .39688.13228.39688.39687 0 .23812-.18521.37-.39688.37s-.37052-.13188-.37052-.37c0-.26459.15885-.39687.37052-.39687z"/>
            <path d="M39.07875 6.2973v.47593h.07958v-.185h.05271l.15917.185h.07906l-.1323-.21136c.05295 0 .10595-.05289.10595-.13229 0-.07939-.07918-.13229-.185-.13229zm.07958.07906h.07958c.0529 0 .07907.02682.07907.05322 0 .0529-.02617.07907-.07907.07907h-.07958zM19.84375 6.985H20.955V1.66687h-1.11125zm-1.95792 0h1.1377V1.66687h-1.1377zm18.33573-4.1273c-.50271 0-.92635.15855-1.24385.4496-.39688.37041-.58188.92593-.58188 1.61385 0 1.27.74084 2.06396 1.98438 2.06396.58208 0 1.1377-.15907 1.5875-.4501l.02635-.02636-.1323-.8201-.0527.02635c-.47625.3175-.87313.4501-1.32292.4501-.58208 0-.9527-.37062-1.00562-1.00562h2.51354l.02635-.26459c0-1.34937-.60834-2.03708-1.7725-2.03708zm0 .74053c.55562 0 .71417.47635.71417.89969h-1.4552c.0529-.5821.3177-.89969.74103-.89969zm-4.02181-1.93136v1.27h-.55562v.84667h.55562v2.01083c0 .79375.42333 1.19063 1.34938 1.19063.29104 0 .47625-.0529.635-.0794h.0529l-.15875-.87312h-.0529c-.0794.0265-.15875.0265-.29105.0265-.3175 0-.47625-.13229-.47625-.42334V3.78356h.79375l.0265-.84667h-.82021v-1.27h-1.05833M29.71291 2.8577c-.66146 0-1.19063.15866-1.5875.29095l-.02687.02635.1323.84698.05322-.02687c.47625-.21167.89917-.3173 1.29605-.3173.42333 0 .6351.18522.6351.52917v.10594c-1.61396.15875-2.38125.66146-2.38125 1.5875 0 .66146.4499 1.08469 1.16427 1.08469.50271 0 .8997-.15886 1.29656-.50282l.07958.42323h.92604v-2.7249c0-.89959-.5027-1.32291-1.5875-1.32291zm.5023 2.0898v.87333c-.2646.23813-.55532.37053-.87282.37053-.26458 0-.42323-.15875-.42323-.39688 0-.44979.44938-.74115 1.29605-.84698zm-4.70942-3.28061v1.27h-.55562v.84667h.55562v2.01083c0 .79375.44979 1.19063 1.34938 1.19063.29104 0 .47625-.0265.635-.0794h.0529l-.1323-.87312h-.0529c-.0794.0265-.1852.0265-.3175.0265-.3175 0-.47624-.13229-.47624-.42334V3.78358h.8202v-.84667h-.8202v-1.27h-1.05834m-3.59833 1.5875c-.21167.21167-.3175.47625-.3175.79375.0265.79375.42333 1.03188 1.40229 1.27.635.1323.76729.23813.76729.52917 0 .23813-.15875.34396-.60854.34396-.4498 0-.97896-.15875-1.4023-.42333l-.0794-.0529-.15874.87312.0529.0265c.34396.18521.92604.37042 1.56104.37042.60854 0 1.05834-.13229 1.32292-.39688.21167-.21166.3175-.5027.3175-.84666 0-.84667-.47625-1.05834-1.45521-1.29646-.60854-.15875-.71437-.23813-.71437-.47625.0265-.18521.21166-.3175.5027-.3175.37042 0 .84667.13229 1.24355.34396l.0529.0265.15875-.87313-.0529-.0265c-.39688-.15875-.87313-.26458-1.4023-.26458-.5027 0-.92604.15875-1.19062.39687M1.90531 1.69344l-.23823.23823c.0265 0 .07907.0527.07907.0527.0265 0 .37032.26439.42323.3173-.0265.0265-.15865.39687-.15865.39687-.13229.3175-.26458.63522-.26458.87334v.0527l.10593.55604v.02636c.0794.3175.13208.63468.185.87281 0 .0794.00033.10584.05323.1323.15875.15875.42344.5028.7674 1.16427 0 .0265.02635.02682.02635.05322.0265.0794.0795.1322.10594.15865.0794.0529.18521.0529.26458 0 .15875-.10583.29063-.23802.37-.42323.0265.0265.10594.10583.10594.1323-.29104.47624.21167.66124.39688.58187-.10583.29104.29114.52927.6351.37052.0529.1852.21177.23812.37052.26458.13229.0265.34396.05276.66146.02636.5027-.0529.95219-.1851 1.1374-.29094.37042-.18521.5825-.42313.68833-.58188l.0527-.05323c.0265.0794.0794.1326.1323.18552.10583.10583.23791.15865.3173.15865.0794-.0265.1327-.0529.15915-.1323.15875-.39687.52906-.87312.82011-1.19062l.02635-.05322c.0794-.23813.29094-.79365.42323-1.0847l.07959-.23822v-.05271c.0265-.0794.02635-.1852.02635-.26458 0-.39687-.05269-.7672-.185-1.0847-.0529-.15874-.10573-.26478-.15865-.34416l-.05322-.10593c.0794-.1323.3176-.29104.5028-.39688l.02636-.02635-.2377-.23823-.15917.10593c-.18521.10584-.34365.15876-.47594.1323 0-.0265-.1323-.10594-.1323-.10594h-.18551l.05322.05323c.10584.13229.15885.21134.23823.34364l.02636.07959.0527.10593.05323.15865.02636.02636.02635.07958.10594.37052c.10583.39688.13219.71417.15865.97875l-.02636.02635-.13229.37052c-.13229.37041-.29124.84677-.34416 1.03198v.02636c-.37041.37042-.6347.79375-.74053 1.05833-.0265.0265-.02687.02683-.02687.05323-.0265 0-.07899-.05308-.10542-.07959-.0794-.0794-.13229-.23802-.13229-.42322 0-.21167.10583-.39698.26458-.50282.0265-.0265.02636-.07958.02636-.07958-.0529-.26458.02629-.6347.185-.74052l.02635-.02687-.02635-.02636c-.47625-.34396-.6877-.9526-.71417-1.42885v-.05271l-.05323.02635c-.0264 0-.0527.05323-.0527.05323 0 .0794-.02636.18521-.02636.26458 0 .23813.05256.44979.07906.52917.0529.23812.1852.47615.39688.68781v.02636c-.0794.10584-.13178.34395-.13178.52917 0 .0529-.00014.10572.02636.15864-.21167.15875-.26448.39677-.29094.55552v.15917l-.10594.13229v.02635c-.21167.2646-.34385.44949-.6878.60824-.37042.1852-1.05855.3175-1.5348.26458-.15875-.0265-.15865-.15865-.15865-.15865 0-.0265.02636-.05256.02636-.07906l.05271-.02687c.42333.0264.84677-.02608 1.03198-.10542l.05322-.07959.02636-.02635h-.05323c-.37042.0794-1.11114-.02681-1.48156-.18552-.44979-.18521-.58208-.34396-.92604-.79375l-.10594-.1323c0-.10582-.02616-.23781-.07906-.34364-.0794-.10583-.15906-.15906-.18552-.18552.0265-.0794.05322-.1851.05322-.29094 0-.15875-.02668-.29104-.07958-.39687.26458-.18521.39688-.39698.39688-.6351 0-.10584-.07907-.26459-.07907-.26459l-.10593-.0527.02635.07957c.0265.37042-.34417.635-.60875.79375l-.0527.07907H2.99c.21167.13229.21156.52926.15865.7674l.02687.02635.10593.07958c.18521.26458.15843.66166-.05322.87333-.0529.0529-.05257.05271-.07907.05271-.0265 0-.05323-.0795-.05323-.10593l-.07906-.10594c-.15875-.34396-.3176-.63458-.6351-1.03146l-.02688-.02688c-.0529-.5027-.13197-.87291-.21135-1.24333l-.05323-.18552v-.0527c.0265-.39689.1327-.68803.29146-1.03199l.07906-.21135.07958-.18552V2.0903c.10583-.10584.21188-.21146.34417-.31729l.07906-.05323-.10593-.02635s-.1322.0266-.29094.10594H2.5404c-.13229.0529-.26468.10563-.37052.0527 0 0-.23812-.13218-.26458-.15864zm1.9575 4.73614c.0529.0529.23843.21167.31781.26459-.29105.0529-.39719-.13229-.3178-.26459zm.47646.37c.13229.0794.34396.1326.52917.18553-.39687.1852-.63501.02619-.52917-.18552z"/>
            <path d="M3.6777.635l.0794.0794.21168.18521.13229.13229c.10583.0794.13229.1323.13229.15875 0 0-.0265.0265-.0529.0265l-.0265.0265-.0265.0794h.0529c.3175-.0265.58208.1852.76729.34395.34396.29105.58208.7673.635 1.21709l.23812 1.27.10584.18521.0264.0529.0265.0794c.0529.0794.10584.13229.10584.15875l.13229.0794.1852.18521.0529.0529.0794.0794c0 .0265.26459.0529.26459.0529.44979.0529.42333.29104.42333.29104s.26459-.37042-.37041-.52917c0 0-.18521-.0264-.21167-.0264l-.0529-.10584c-.0264 0-.0264-.0265-.0264-.0265L6.35 4.49809l-.0794-.0529c0-.0265-.0794-.21167-.0794-.21167l-.10583-.26458c-.0265-.0794-.0529-.21167-.0794-.39688l-.0265-.10583-.0794-.52917.0265-.10583c.0264-.21167.10583-.42333.23812-.66146.13229-.26458.42333-.44979.42333-.44979.21167-.13229.52917-.21167.68792-.23812.0794 0 .0794-.0529.10583-.0794v-.0265h-.0265c-.0794-.0265-.18521-.0529-.21167-.0529v-.0265s.0265-.0265.0529-.0794l.13229-.10583.0794-.0794s.34396-.3175.37042-.37041l-.3175-.0794-.34396.34396c-.21167.21167-.47625.47625-.58208.52917-.29104.10583-.5821.39687-.71438.635l-.0794.21166c-.0794-.23812-.18521-.44979-.34396-.60854-.15875-.18521-.37042-.34396-.60854-.42333-.1323-.13229-.5821-.52917-.82021-.71438z"/>
            <path d="M5.5827 4.36562c.0265-.10583-.0265-.23812-.0265-.23812l-.0265.0794c-.0265.0794-.10582.15875-.23811.21167l-.0265.0265.44979.635.0265.0265.10583.13229.1852.10583.0529.0265.21167.13229.1852.10584h.0265l.29105.0265c.15875 0 .26458.0794.3175.10584.15875.13229.0794.3175.0794.3175s.23812-.21167.0794-.44979c-.0529-.0794-.1323-.15875-.37042-.18521l-.29104-.0529-.15875-.10583-.21166-.10584-.0529-.0264-.15875-.0794z"/>
            <path d="M5.31812 5.715l.0529.0265.1852.0794c.1323.0529.29105.13229.37043.15875l.21166.13229c.0265 0 .23813-.0264.37042 0 .1852 0 .3175.0794.39687.15875.0794.15875-.0264.29105-.0264.29105.0264-.0265.21166-.1323.21166-.34396-.0265-.18521-.18521-.34396-.82021-.34396l-.15875-.10583-.0529-.0265-.2646-.13229-.23811-.0794-.0529-.0794c-.0794-.1323-.18521-.26459-.26458-.37042l-.0265-.0265s-.15875-.21167-.15875-.23812c.0265-.10584 0-.23813 0-.23813s-.0265.0529-.0794.10583c-.0265.0529-.15875.1323-.23813.15875l-.0265.0265.55563.74084z"/>
            <path d="M4.60375 6.00604l.10583.10583.21167.10584.1852.10583h.0265l.1323.0794.21166.10583c.0265.0265.0529.0265.0529.0265l.29104-.0265c.1852 0 .37042 0 .5027.0529.15876.0794.10584.21166.10584.21166s.15875-.10583.1323-.23812c-.0265-.10584-.15875-.23813-.5821-.26459h-.37034l-.18521-.10583-.0794-.0529c-.0265 0-.26458-.13229-.26458-.13229l-.18521-.0529c0-.0265-.1323-.21167-.1323-.21167l-.0529-.0794-.15874-.21166-.0794-.0794c0-.0265-.0794-.13229-.0794-.13229s.0794-.13229.0794-.26458l-.0794.0794c-.0529.0529-.23812.13229-.37041.15875h-.0529l.42333.55563z"/>
          </g>
        </svg>
      ),
    },
    {
      name: 'Spotify',
      svg: (
        <svg viewBox="0 0 50 50" className="h-8 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM31.907 31.236C31.657 31.636 31.157 31.768 30.757 31.518C26.493 28.93 21.196 28.366 14.919 29.616C14.457 29.709 14.014 29.407 13.921 28.945C13.828 28.483 14.129 28.04 14.592 27.947C21.428 26.593 27.258 27.245 32.008 30.133C32.408 30.383 32.54 30.883 32.29 31.283V31.236ZM33.947 27.12C33.634 27.621 32.997 27.784 32.496 27.471C27.571 24.446 20.009 23.634 14.408 25.184C13.845 25.347 13.257 25.022 13.094 24.459C12.932 23.896 13.257 23.308 13.82 23.145C20.196 21.382 28.508 22.27 34.084 25.684C34.584 25.997 34.747 26.634 34.434 27.134L33.947 27.12ZM34.109 22.891C28.108 19.388 19.196 19.014 14.058 20.652C13.383 20.852 12.683 20.452 12.483 19.777C12.283 19.102 12.683 18.402 13.358 18.202C19.233 16.339 29.096 16.777 35.971 20.777C36.583 21.139 36.784 21.952 36.421 22.564C36.059 23.177 35.246 23.377 34.634 23.014L34.109 22.891Z" fill="#333333"/>
        </svg>
      ),
    },
    {
      name: 'Google',
      svg: (
        <svg viewBox="0 0 24 24" className="h-8 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.501 12.2332C22.501 11.3699 22.4296 10.7399 22.2748 10.0865H12.2153V13.9832H18.12C18.001 14.9515 17.3582 16.4099 15.9296 17.3898L15.9096 17.5203L19.0902 19.9352L19.3106 19.9565C21.3343 18.1249 22.501 15.4282 22.501 12.2332Z" fill="#333333"/>
          <path d="M12.214 22.5C15.107 22.5 17.5335 21.5666 19.3092 19.9567L15.9283 17.3899C15.0242 18.0083 13.801 18.4399 12.214 18.4399C9.38023 18.4399 6.96073 16.6083 6.10303 14.0766L5.98262 14.0871L2.68913 16.5954L2.64819 16.7132C4.41284 20.1433 8.0629 22.5 12.214 22.5Z" fill="#333333"/>
          <path d="M6.10343 14.0767C5.88676 13.4234 5.75843 12.7233 5.75843 12C5.75843 11.2767 5.88676 10.5767 6.0901 9.92337L6.08343 9.78423L2.75016 7.2356L2.64856 7.28667C1.91928 8.71002 1.50098 10.3083 1.50098 12C1.50098 13.6917 1.91928 15.29 2.64856 16.7133L6.10343 14.0767Z" fill="#333333"/>
          <path d="M12.214 5.55997C14.2256 5.55997 15.583 6.41163 16.3569 7.12335L19.3809 4.23C17.5202 2.53834 15.107 1.5 12.214 1.5C8.06287 1.5 4.41284 3.85665 2.64819 7.28662L6.08977 9.92332C6.96073 7.39166 9.38023 5.55997 12.214 5.55997Z" fill="#333333"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={cn('w-full py-6 px-4', className)}>
      <p className="text-center text-sm text-gray-700 uppercase tracking-wide mb-4 font-medium">Trusted by leading companies</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="opacity-80 hover:opacity-100 transition-all duration-300"
            title={company.name}
          >
            {company.svg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogoBanner;
