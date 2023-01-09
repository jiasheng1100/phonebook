const Footer = () => {  
    const footerStyle = {    
        color: 'darkblue',    
        fontStyle: 'italic',    
        fontSize: 12  
    }  
    return (    
        <div style={footerStyle}>      
            <br /> <br />     
            <em>Phonebook App, Homework for Online Course "Full-Stack Web Development"</em>  
            <br /> 
            <div>By Jia Sheng, &copy;2023</div> 
        </div>  
    )
}

export default Footer