import { Image } from '@heroui/image';
import './footer.css'

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="brand_container footer_brand_container">
        <Image src="dashboard/src/imgs/logo.png" className="brand_img footer_brand_img" />
        <h2 className="brand_text footer_brand_text">Best Analytics Service</h2>
      </div>
      <span className="copyright">Copyright © 2025 Analytics Dashboard</span>
    </div>
  )
}
