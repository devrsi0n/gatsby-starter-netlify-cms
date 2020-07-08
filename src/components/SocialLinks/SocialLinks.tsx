/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';
import { IconGithub, IconTwitter, IconWeibo } from '@components/Icons';

interface SocialLinksProps {
  links: {
    name?: string;
    url?: string;
  }[];
  fill?: string;
}

const icons = {
  github: IconGithub,
  twitter: IconTwitter,
  weibo: IconWeibo,
  // dribbble: IconDribbble,
  // linkedin: IconLinkedIn,
  // facebook: IconFacebook,
  // instagram: IconInstagram,
  // youtube: IconYouTube,
  // medium: IconMedium,
  // unsplash: IconUnsplash,
  // patreon: IconPatreon,
  // paypal: IconPaypal,
};

const getHostname = (url: string) => {
  return new URL(url.toLowerCase()).hostname.replace('www.', '').split('.')[0];
};

function SocialLinks({ links, fill = '#73737D' }: SocialLinksProps) {
  if (!links) return null;

  return (
    <React.Fragment>
      {links.map(option => {
        const name = option.name || getHostname(option.url);
        const Icon = icons[name];
        if (!Icon) {
          throw new Error(
            `unsupported social link name=${name} / url=${option.url}`
          );
        }
        return (
          <SocialIconContainer
            key={option.url}
            target="_blank"
            rel="noopener nofollow"
            data-a11y="false"
            aria-label={`Link to ${option.url}`}
            href={option.url}
            sx={{
              "&[data-a11y='true']:focus::after": {
                borderColor: 'accent',
              },
              '&:hover': {
                svg: {
                  '*': {
                    fill: 'primary',
                  },
                },
              },
            }}
          >
            <Icon fill={fill} />
            <Hidden>Link to ${option.url}</Hidden>
          </SocialIconContainer>
        );
      })}
    </React.Fragment>
  );
}

export default SocialLinks;

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  max-width: 16px;

  &:hover {
    svg {
      * {
        transition: fill 0.25s var(--ease-in-out-quad);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    margin: 0 2.2rem;
  `};
`;

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`;
