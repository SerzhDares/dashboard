import './textBlock.css'

export const TextBlock: React.FC = () => {
  return (
    <div className="text_block">
        <h1 className="text_block_title">Some information</h1>
        <article className="some_text">
          Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Laudantium eaque optio qui 
          esse reiciendis ipsa delectus fugit voluptates 
          perspiciatis obcaecati consequuntur exercitationem, 
          animi sequi, velit eius quidem dolores facilis quae.<br/>
          Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Laudantium eaque optio qui 
          esse reiciendis ipsa delectus fugit voluptates 
          perspiciatis obcaecati consequuntur exercitationem, 
          animi sequi, velit eius quidem dolores facilis quae.<br/>
          Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Laudantium eaque optio qui 
          esse reiciendis ipsa delectus fugit voluptates 
          perspiciatis obcaecati consequuntur exercitationem, 
          animi sequi, velit eius quidem dolores facilis quae.
        </article>
    </div>
  )
}
