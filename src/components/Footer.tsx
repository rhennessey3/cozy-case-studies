
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#231f20] text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm mb-3">Design & Code with love</p>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="162" height="35" fill="none">
              <path fill="currentColor"
                  d="M5.364.792c-.072 1.296-.108 2.232-.072 2.808.036.288 0 1.584.036 1.908-.468.72-1.152 1.548-1.692 2.376-1.188 1.872-2.052 3.96-2.592 6.156-.252 1.152-.324 2.304-.36 3.456-.036.576-.036 1.188.108 1.692.036.144.072.324.18.396.072.072.108 0 .216-.072.036-.036.18-.108.216-.18 0-.144-.072-.144-.144-.216-.144-.216-.144-.576-.18-.792-.036-.324 0-.612 0-.9.036-.576.108-1.116.18-1.656.18-1.188.432-2.304.828-3.384.396-1.08.864-2.196 1.404-3.204.54-.972 1.152-1.98 1.872-2.844l.108 2.628c.072 3.6.036 7.164 0 10.764 0 .864.036 1.764.036 2.628v2.088c0 .144-.036.216-.18.36-.396.54-.828 1.116-1.152 1.728-.36.684-1.368 2.34-.576 3.384.324.432 1.116.72 2.016.828.036.72.072 1.764.144 2.52.036.072.036.18.144.216.036 0 .18-.072.216-.144a.568.568 0 00.072-.468 43.412 43.412 0 01-.072-2.088c.108 0 .612.072 1.008.108 1.8.144 2.592.252 4.14.504 1.656.324 3.276.576 4.896 1.008.18.072.396.108.576.18.108.036.18.072.252.108.144.036.108.072.216 0 .144-.036.288-.18.144-.324-.108-.072-.324-.144-.468-.216-.792-.324-1.62-.432-2.448-.648-1.62-.36-3.312-.72-4.968-.972-.828-.108-1.656-.216-2.448-.324-.216 0-.9-.108-.9-.108-.036-.036 0-1.116-.036-1.548V25.92c0-.216-.036-.468 0-.684.072-.18.288-.324.36-.504l.864-.972c2.196-2.556 4.5-5.004 6.624-7.668 2.088-2.664 4.284-5.472 5.148-8.892.432-1.656.144-3.42-.864-4.752C17.172 1.116 15.516.54 13.932.54c-2.268 0-4.5 1.224-6.408 2.808-.612.54-1.188 1.044-1.728 1.656-.072-.828-.036-1.692-.072-2.52 0-.54-.036-1.08-.036-1.62 0-.108 0-.18-.144-.216-.072 0-.18 0-.18.144zm4.5 18.612c-.252.324-1.728 1.944-1.836 2.016 0 .072-.612.756-.828 1.008-.072.108-.9 1.152-1.08 1.368v-1.44c.036-3.888 0-7.776-.144-11.664 0-.972-.036-1.944-.072-2.88-.036-.468-.036-.972-.072-1.476 0-.216-.072-.468.108-.648.108-.18.288-.324.396-.504 1.26-1.332 2.7-2.556 4.356-3.312 1.656-.792 3.564-1.116 5.364-.288 1.656.684 2.736 2.52 2.556 4.32-.108.972-.432 1.872-.792 2.772-.612 1.656-2.268 3.96-2.52 4.284-.432.648-.9 1.152-1.368 1.728-.216.288-.792.972-1.368 1.656-.108.144-2.484 2.772-2.7 3.06zm-4.32 6.48c0 1.404.036 2.772.036 4.14-.432-.108-.936-.18-1.26-.468-.396-.324-.396-.756-.288-1.224.144-.504.396-.9.648-1.296.18-.216.288-.432.432-.576.144-.216.252-.396.432-.576zm13.06-11.412a6.92 6.92 0 00-.18.864c-.108.756-.216 1.368-.324 2.34-.072.756-.144 2.484.432 3.024.648.576 1.584-.036 2.124-.468.72-.54 1.368-1.188 2.016-1.872.54-.54 1.116-1.26 1.584-1.836.036-.072.18-.216-.144-.324-1.008 1.368-2.304 2.628-3.636 3.708-.36.252-.756.504-1.152.576-.396.072-.576-.36-.684-.72-.18-.648-.072-1.98.072-2.916.072-.504.18-1.008.252-1.512.036-.252.072-.504.072-.72 0-.144 0-.216-.108-.252-.072-.036-.288-.036-.324.108zm.288-3.492c.18.108.324 0 .36-.072.072-.144.036-.288-.072-.36-.144-.108-.324 0-.36.108a.234.234 0 00.072.324zm7.457 4.356c.144 0 .324-.072.18-.396a1.094 1.094 0 00-.468-.432c-.468-.216-1.044.18-1.404.684-.936 1.296-.972 2.7-1.008 3.348 0 .864.288 1.944 1.512 1.692.756-.18 1.836-1.08 2.7-1.692 1.224-.9 1.872-1.188 3.024-1.908.252-.144.216-.288-.036-.432-1.224.72-2.628 1.512-3.744 2.34-.432.288-.864.612-1.296.864-.324.18-1.008.684-1.332.324-.324-.36-.36-1.44-.288-1.872.036-.288.108-1.296.972-2.556.576-.828 1.08-.144 1.188.036zM33.028.324c-.072.036-.18.648-.36 1.44-.504 2.556-.756 4.248-1.116 6.804-.36 2.52-.72 5.076-.756 7.632 0 .648 0 1.26.072 1.872.036.576.144 1.728.576 2.016.684.468 1.584-1.296 1.836-1.8.684-1.188 1.548-2.664 1.98-3.024.612-.504.864.288.972.756.108.54.144 1.152.36 1.656.252.54.648.864 1.224.828.612-.072 1.116-.396 1.62-.684.54-.324 1.476-.9 2.016-1.188.288-.18.288-.324.036-.432 0 0-.828.468-1.116.648-.54.324-1.044.648-1.62.9-.432.216-1.044.54-1.476.144-.396-.432-.432-1.116-.54-1.656-.072-.432-.144-1.188-.612-1.44-.54-.288-.972.072-1.296.468-.828.936-1.404 2.124-2.016 3.204-.252.432-.54 1.044-.972 1.332-.396.288-.504-1.152-.54-1.476-.144-1.26-.072-2.592 0-3.888.18-2.556.504-5.148.864-7.704.288-1.908.504-2.916.828-4.824.072-.324.216-1.188.288-1.404.036-.18-.072-.18-.252-.18zm11.696 14.328a28.717 28.717 0 00-.144 1.584c-.036.54 0 1.116.108 1.656.18.828.756 1.836 1.764 1.656.864-.18 1.548-.936 2.196-1.512.36-.324 1.368-1.368 1.512-1.548.108-.108.036-.216-.144-.288 0 0-.72.684-.864.828-.612.612-1.296 1.332-2.052 1.8-.288.18-.756.468-1.152.252-.72-.432-.864-1.62-.9-2.376-.036-.504.036-1.44.144-2.196.036-.252-.144-.288-.288-.324-.18-.036-.324.144-.468.324-.468.576-.792 1.26-1.26 1.872-.504.72-.936 1.404-1.656 1.872-.18-.72-.072-1.62.756-2.268.144-.108.288-.18.144-.288-.108-.072-.324-.072-.468 0-.684.36-.9 1.584-.9 2.196 0 .288.144.648.54.648.432 0 1.296-1.116 1.692-1.728.54-.72.936-1.404 1.44-2.16zm6.527-3.132c.504.036.792.324.864.684.324 1.224-1.116 3.24-1.728 4.032.252.252.468.432.756.72.324.324.72.612 1.008.972.576.72.828 1.584.828 2.556-.036.972-.144 1.764-.216 2.736-.144 1.584.036 2.088.216 2.088.9.108 1.908-1.26 2.412-1.98.54-.756.936-1.584 1.368-2.412.468-.864.864-1.764 1.332-2.628.18-.396 1.008-2.088 1.008-2.088.36.072.36.252.252.468a59.095 59.095 0 01-.828 1.764 99.979 99.979 0 01-1.692 3.348c-.504.864-.972 1.692-1.584 2.484-.504.648-1.656 1.764-2.448 1.512-.684-.216-.684-1.152-.684-1.836.036-.972.18-2.052.288-3.024.072-.936.072-1.692-.504-2.484-.252-.36-.576-.684-.9-.972-.36-.288-1.188-1.08-1.224-1.116-.576-.576-.864-1.404-.864-2.196.036-1.26.936-2.628 2.34-2.628zM50.1 15.948c.252-.252.396-.54.612-.828.36-.576.684-1.188.936-1.836.504-1.332-.504-1.8-1.476-.936-.432.432-.72.936-.792 1.512-.144.828.252 1.476.72 2.088zm18.25.252s-.791 1.512-1.151 2.124c-.396.612-.792 1.26-1.26 1.836-.432.54-.936 1.116-1.584 1.368-.684.252-1.008-.72-1.116-1.224-.18-.756-.216-1.512-.252-2.304-.036-1.476 0-2.988.108-4.464.036-.756.072-1.512.18-2.268L63.706 9c.252-1.476.504-2.952.72-4.464.072-.756.108-1.476.18-2.232 0-.108.072-.36 0-.468-.036-.072-.288-.108-.36-.072-.18.072-.216.576-.252.756-.288 1.476-.468 2.952-.684 4.428-.18 1.44-.396 2.88-.504 4.32-.072.756-.288 1.512-.468 2.232-.18.72-.36 1.404-.576 2.088-.216.72-.504 1.404-.792 2.124a6.932 6.932 0 01-.936 1.764c-.18.252-.396.54-.72.72-.252.144-.468.108-.612-.18-.252-.396-.108-1.476.072-2.088a5.58 5.58 0 01.936-1.98c.18-.216.36-.504.684-.612.144-.072.288-.072.468 0 .072.036.216.216.288.216.108 0 .36-.216.36-.324a.43.43 0 00-.18-.324c-.216-.144-.612-.18-.864-.108-.648.144-1.116.864-1.404 1.404-.324.612-.612 1.26-.792 1.944-.144.684-.216 1.584.036 2.124.144.252.432.468.756.432.324 0 .54-.144.792-.324.504-.432.864-1.044 1.152-1.62.684-1.332 1.152-2.772 1.548-4.176.072 0-.036.936-.036 1.044-.036.36-.036.684-.036 1.044 0 .756 0 1.548.072 2.304.036.72.144 1.476.396 2.196.252.612.792 1.044 1.512.828.54-.144 1.08-.684 1.512-1.188 1.008-1.08 1.908-2.808 2.556-4.104.108-.216.108-.396-.18-.504zM86.872 2.088c-.144-.144-.36-.18-.54-.036a3.75 3.75 0 00-.36.648c-.252.756-.325 1.548-.54 2.268-.216.72-.828 1.44-1.224 2.016-1.26 1.728-2.7 3.312-4.176 4.824-.469.468-1.693 1.8-2.593 2.7-.035-.576.252-6.12.36-7.38.108-1.476.252-3.276.36-4.896 0-.144.108-.324-.072-.396-.144-.036-.323-.036-.36.144-.216 1.08-.395 3.42-.468 4.644-.072 1.224-.143 2.448-.215 3.708a234.925 234.925 0 01-.253 4.896 2.444 2.444 0 00-.431.432c-1.404 1.404-2.593 2.628-3.636 3.96-.684.9-1.368 1.908-1.44 3.024-.037.576.144 1.044.468 1.512.323.432.828.828 1.26 1.116.972.612 1.944 1.224 2.663 2.124.144.18.288.396.396.648.145.216.145.468.145.756 0 .36-.109 1.332.395 1.332.612 0 .576-.684.433-1.188-.037-.324-.18-.576-.253-.828-.072-.252 0-.576 0-.828.072-2.448.252-4.932.36-7.38.036-1.548.144-2.772.252-4.356.72-1.08 4.788-5.04 6.66-7.596.36-.468.72-.972 1.044-1.476-.107 1.404-.215 1.62-.323 2.844a42.463 42.463 0 00-.325 2.916c-.144 2.016-.36 3.96-.431 5.976-.18 3.888.072 7.812.36 11.7.072.972.144 1.944.36 2.916.072.18.18.648.36.648.072 0 .36-.036.287-.324-.18-.36-.252-.756-.288-.936-.287-1.98-.36-3.996-.431-5.94-.072-1.98-.108-3.924-.037-5.94.072-1.908.216-3.852.36-5.832.108-1.944.288-3.888.54-5.832.109-.972.252-1.908.397-2.844.108-.432.18-.9.36-1.296.215-.432.431-.828.54-1.296.072-.18.288-1.044.036-1.152zM76.359 21.744c-.108 1.764-.108 3.564-.18 5.328a12.467 12.467 0 00-2.053-1.836c-.755-.612-1.547-.972-1.98-1.908-.323-.792.073-1.692.504-2.412.468-.828 1.116-1.584 1.728-2.304.793-.864 1.513-1.692 2.34-2.52-.108 1.584-.288 3.816-.36 5.652zm17.017-5.04c.216-.216.072-.432-.144-.504 0 0-1.656 1.512-1.944 1.764-.54.504-1.908 1.656-2.916 1.512-.324-.036-.612-.324-.756-.576-.396-.684-.252-1.476-.108-2.196.216.648.9.648 1.332.396.504-.288.828-.828.828-1.404s-.36-.936-.936-.9c-.54.036-1.008.576-1.26 1.008-.54.936-.792 2.304-.252 3.312.252.504.72.828 1.296.828 1.368 0 2.52-1.224 2.988-1.584.252-.216 1.548-1.368 1.872-1.656zm-5.58-.612c.216-.324.504-.828.936-.864.468-.072.54.504.432.864-.108.504-.864 1.26-1.296.54a.667.667 0 01-.072-.252c0-.108.072-.216 0-.288zm5.474 3.276c-.072-.576.072-1.548.18-2.232.072-.432.144-.828.18-1.224.036-.18.144-.828.036-.936-.036-.072-.18-.072-.216.036-.072.144-.252 1.296-.324 1.692-.144.756-.252 1.512-.252 2.268 0 .18 0 .72.252.828.216.072.468-.216.54-.324.324-.36.792-1.044 1.188-1.584.396-.576.9-1.188 1.296-1.692.18-.216.792-.792.972-.756.144.036.18.684.18 1.116 0 .36.036.9.072 1.26.072.468.216 1.224.756 1.404.576.216 1.224-.396 1.584-.756.576-.576 1.224-1.296 1.584-1.8.144-.216.216-.36-.036-.468 0 0-.288.36-.432.504-.432.504-.9 1.008-1.368 1.476-.396.36-1.008.972-1.404.288-.288-.54-.252-1.224-.288-1.836 0-.468.036-1.404-.432-1.548-.648-.144-1.116.54-1.476.936-.9 1.044-1.728 2.304-2.592 3.348zm8.016 0c-.072-.576.072-1.548.18-2.232.072-.432.144-.828.18-1.224.036-.18.144-.828.036-.936-.036-.072-.18-.072-.216.036-.072.144-.252 1.296-.324 1.692-.144.756-.252 1.512-.252 2.268 0 .18 0 .72.252.828.216.072.468-.216.54-.324.324-.36.792-1.044 1.188-1.584.396-.576.9-1.188 1.296-1.692.18-.216.792-.792.972-.756.144.036.18.684.18 1.116 0 .36.036.9.072 1.26.072.468.216 1.224.756 1.404.576.216 1.224-.396 1.584-.756.576-.576 1.224-1.296 1.584-1.8.144-.216.216-.36-.036-.468 0 0-.288.36-.432.504-.432.504-.9 1.008-1.368 1.476-.396.36-1.008.972-1.404.288-.288-.54-.252-1.224-.288-1.836 0-.468.036-1.404-.432-1.548-.648-.144-1.116.54-1.476.936-.9 1.044-1.728 2.304-2.592 3.348zm14.028-2.664c.216-.216.072-.432-.144-.504 0 0-1.656 1.512-1.944 1.764-.54.504-1.908 1.656-2.916 1.512-.324-.036-.612-.324-.756-.576-.396-.684-.252-1.476-.108-2.196.216.648.9.648 1.332.396.504-.288.828-.828.828-1.404s-.36-.936-.936-.9c-.54.036-1.008.576-1.26 1.008-.54.936-.792 2.304-.252 3.312.252.504.72.828 1.296.828 1.368 0 2.52-1.224 2.988-1.584.252-.216 1.548-1.368 1.872-1.656zm-5.58-.612c.216-.324.504-.828.936-.864.468-.072.54.504.432.864-.108.504-.864 1.26-1.296.54a.667.667 0 01-.072-.252c0-.108.072-.216 0-.288zm6.986-.792c.144.108.252-.108.288-.252.036-.144.072-.792-.684-.828-.324 0-.576.108-.792.324-.468.54-.468 1.332-.324 1.98.144.684.468 1.368.756 2.016.36 1.008.684 2.088.684 3.168 0 .144.036.396-.072.504-.54.468-1.44 1.26-1.944 1.728-.504.468-1.008.972-1.404 1.548-.36.54-.72 1.368-.324 1.872.288.36 1.116.288 1.548.036a3.828 3.828 0 001.404-1.332c.396-.576.684-1.224.9-1.872.108-.36.216-.72.252-1.08.072-.288 0-.72.216-.9 1.656-1.476 3.204-3.024 4.788-4.608.288-.252.54-.504.792-.792.108-.072.54-.432.144-.612-1.368 1.332-2.808 2.772-4.212 4.068a21.33 21.33 0 01-1.62 1.476 10.44 10.44 0 00-.324-2.124 10.605 10.605 0 00-.612-1.8c-.216-.576-.504-1.152-.612-1.764-.072-.468 0-1.188.468-1.404a.506.506 0 01.504.072c.252.216.072.54.18.576zm-.18 7.524a7.506 7.506 0 01-.792 2.448c-.324.612-.792 1.26-1.404 1.62-.252.144-.864.324-1.044.144-.252-.252-.036-.648.108-.936.324-.684.864-1.224 1.404-1.728.54-.54 1.116-1.08 1.728-1.548zm7.949-7.524c.144.108.252-.108.288-.252.036-.144.072-.792-.684-.828-.324 0-.576.108-.792.324-.468.54-.468 1.332-.324 1.98.144.684.468 1.368.756 2.016.36 1.008.684 2.088.684 3.168 0 .144.036.396-.072.504-.54.468-1.44 1.26-1.944 1.728-.504.468-1.008.972-1.404 1.548-.36.54-.72 1.368-.324 1.872.288.36 1.116.288 1.548.036a3.828 3.828 0 001.404-1.332c.396-.576.684-1.224.9-1.872.108-.36.216-.72.252-1.08.072-.288 0-.72.216-.9 1.656-1.476 3.204-3.024 4.788-4.608.288-.252.54-.504.792-.792.108-.072.54-.432.144-.612-1.368 1.332-2.808 2.772-4.212 4.068a21.33 21.33 0 01-1.62 1.476 10.44 10.44 0 00-.324-2.124 10.605 10.605 0 00-.612-1.8c-.216-.576-.504-1.152-.612-1.764-.072-.468 0-1.188.468-1.404a.506.506 0 01.504.072c.252.216.072.54.18.576zm-.18 7.524a7.506 7.506 0 01-.792 2.448c-.324.612-.792 1.26-1.404 1.62-.252.144-.864.324-1.044.144-.252-.252-.036-.648.108-.936.324-.684.864-1.224 1.404-1.728.54-.54 1.116-1.08 1.728-1.548zm12.45-6.12c.216-.216.072-.432-.144-.504 0 0-1.656 1.512-1.944 1.764-.54.504-1.908 1.656-2.916 1.512-.324-.036-.612-.324-.756-.576-.396-.684-.252-1.476-.108-2.196.216.648.9.648 1.332.396.504-.288.828-.828.828-1.404s-.36-.936-.936-.9c-.54.036-1.008.576-1.26 1.008-.54.936-.792 2.304-.252 3.312.252.504.72.828 1.296.828 1.368 0 2.52-1.224 2.988-1.584.252-.216 1.548-1.368 1.872-1.656zm-5.58-.612c.216-.324.504-.828.936-.864.468-.072.54.504.432.864-.108.504-.864 1.26-1.296.54a.667.667 0 01-.072-.252c0-.108.072-.216 0-.288zm4.754 18.18c1.008 0 2.088-.648 2.916-1.44.828-.792 1.476-1.764 1.98-2.808.468-.972.828-2.016 1.116-3.06.072-.288.252-1.152.252-1.152 2.52-2.628 5.328-6.552 6.48-9.216.108-.252-.036-.36-.288-.396 0 0-2.448 4.788-6.012 8.712.36-2.52.468-5.04.252-7.596-.072-.576-.252-1.872-.468-2.556-.072-.252-.144-.324-.432-.36-.324-.036-.432.216-.576.432-.468.756-.864 1.404-1.404 2.052-.324.396-1.728 2.16-2.412 1.728-.324-.216-.36-1.08-.36-1.512 0-.576.072-1.116.18-1.692.036-.252.108-.504.18-.756.036-.144-.252-.252-.36-.072-.144.18-.324 1.296-.36 1.548-.072.612-.252 2.484.648 2.844.72.288 1.872-.684 2.448-1.404.756-.864 1.332-1.836 1.98-2.736.144.216.396 2.052.432 2.52.18 2.448 0 4.824-.252 7.38-.036.36-.036.792-.324 1.08-.792.792-1.62 1.62-2.484 2.376-1.152 1.008-2.412 1.908-3.456 3.024-.468.504-.828 1.116-.864 1.836a1.158 1.158 0 001.188 1.224zm5.652-7.884c-.36 1.476-.864 2.952-1.584 4.284-.648 1.188-1.584 2.196-2.772 2.808-.504.252-1.332.576-1.8.144-.504-.468-.252-1.152.108-1.62a8.641 8.641 0 011.368-1.44c.54-.468 1.044-.9 1.584-1.368.828-.72 1.584-1.332 2.34-2.088.108-.072.504-.468.756-.72zm11.944 7.704a9.326 9.326 0 01-.144-1.476c.18-6.768.756-20.34.792-29.16 0-.54.036-1.008.036-1.512 0-.144-.108-.216-.324-.216-.108.036-.108.18-.108.288 0 .288 0 .432-.036.72-.036 1.944-.756 23.976-.792 29.484 0 .756 0 1.548.108 1.98 0 .036.108.216.288.18.108-.036.216-.144.18-.288zm3.586 0a9.326 9.326 0 01-.144-1.476c.18-6.768.756-20.34.792-29.16 0-.54.036-1.008.036-1.512 0-.144-.108-.216-.324-.216-.108.036-.108.18-.108.288 0 .288 0 .432-.036.72-.036 1.944-.756 23.976-.792 29.484 0 .756 0 1.548.108 1.98 0 .036.108.216.288.18.108-.036.216-.144.18-.288zm3.586 0a9.326 9.326 0 01-.144-1.476c.18-6.768.756-20.34.792-29.16 0-.54.036-1.008.036-1.512 0-.144-.108-.216-.324-.216-.108.036-.108.18-.108.288 0 .288 0 .432-.036.72-.036 1.944-.756 23.976-.792 29.484 0 .756 0 1.548.108 1.98 0 .036.108.216.288.18.108-.036.216-.144.18-.288z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
