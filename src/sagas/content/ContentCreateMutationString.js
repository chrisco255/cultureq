import _ from 'lodash';

function getCreateContentMutationString(type, pillarId, isDeleted, data) {
    let dataObject = '';
    if (data.richtext) {
      const blocksArray = `[${data.richtext.blocks.map((block) => {
			let inlineStyleRangesArray = '';
			let entityRangesArray = '';
			const blockObject = `
				key: "${block.key}"
				text: "${block.text}"
				type: "${block.type}"
				depth: ${block.depth}
			`;
			if (block.inlineStyleRanges.length > 0) {
				inlineStyleRangesArray = `inlineStyleRanges: [${block.inlineStyleRanges.map((inlineStyleRange) => {
					return (
						`
							{
								style: "${inlineStyleRange.style}"
								offset: ${inlineStyleRange.offset}
								length: ${inlineStyleRange.length}
							}
						`
					);
				})}]`;
			}
			if (block.entityRanges.length > 0) {
				entityRangesArray = `entityRanges: [${block.entityRanges.map((entityRange) => {
					return (
						`
							{
								style: "${entityRange.style}"
								offset: ${entityRange.offset}
								length: ${entityRange.length}
							}
						`
					);
				})}]`;
			}
			if (inlineStyleRangesArray !== '' && entityRangesArray === '') {
				return `{${inlineStyleRangesArray}, ${blockObject}}`;
			} else if (entityRangesArray !== '' && inlineStyleRangesArray === '') {
				return `{${entityRangesArray}, ${blockObject}}`;
			} else if (entityRangesArray !== '' && inlineStyleRangesArray !== '') {
				return `{${entityRangesArray}, ${inlineStyleRangesArray}, ${blockObject}}`;
			} else {
				return `{${blockObject}}`;
			}
		})}]`;
		if(_.isEmpty(data.richtext.entityMap)) {
			dataObject = `
			data: {
				richtext: {
					blocks: ${blocksArray}
				}
			}`;
		} else {
			dataObject = `
			data: {
				richtext: {
					blocks: ${blocksArray}
					entityMap: [${data.richtext.entityMap.map((entity) => {
						return (
							`
								{
									type: "${entity.type}"
									mutability: "${entity.mutability}"
								}
							`
						);
					})}]
				}
			}`;
		}
	} else {
		dataObject = `
		data: {
			title: "${data.title}"
			description: "${data.description}"
			url: "${data.url}"
			quote: "${data.quote}"
			author: "${data.author}"
			recipient: "${data.recipient}"
			recipientPosition: "${data.recipientPosition}"
		}`;
	}
	return `
		mutation {
			mutation:CONTENT_CREATE(
				type: ${type}
				pillarId: "${pillarId}"
				isDeleted: ${isDeleted}
				${dataObject}
			) {
	_id
	pillarId
	type
	isDeleted
	data {
		title
		description
		url
		quote
		author
		recipient
		recipientPosition
		richtext {
			blocks {
				key
				text
				type
				depth
				inlineStyleRanges {
					style
					offset
					length
				}
				entityRanges {
					key
					offset
					length
				}
			}
			entityMap {
				type
				mutability
			}
		}
	}
}
		}
	`;
}
module.exports = getCreateContentMutationString;
