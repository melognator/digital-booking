import React from 'react'
import { Heading4, Text1, Text2 } from '../common/commonStyles'
import RatingStars from '../productCard/RatingStars'
import { ReviewAuthor, ReviewBody, ReviewCardContainer, ReviewHeader, ReviewPicture, ReviewScore, ReviewSeparator } from './Product.styles'
import { getInitials } from '../navbar/LoggedUser'
import { ratingText } from '../productCard'

const ReviewCard = ({ author_profileUrl, author_name, rating, commentary }) => {
    return (
        <ReviewCardContainer>
            <ReviewHeader>
                <ReviewAuthor>
                    <ReviewPicture>
                    {
                        author_profileUrl ? 
                        (
                            <img src={author_profileUrl} alt='profile-image'/> 
                        )
                            :
                        (
                            <p>{getInitials(author_name)}</p>
                        )
                    }
                    </ReviewPicture>
                    <div>
                        <p>{author_name}</p>
                        <RatingStars rating={rating} />
                    </div>
                </ReviewAuthor>
                <ReviewScore>
                    <Heading4>{ratingText(rating)}</Heading4>
                </ReviewScore>
            </ReviewHeader>
            {commentary && <>
                <ReviewSeparator />
                <ReviewBody>
                    <Text1>
                        {commentary}
                    </Text1>
                </ReviewBody>
            </>}
        </ReviewCardContainer>
    )
}

export default ReviewCard