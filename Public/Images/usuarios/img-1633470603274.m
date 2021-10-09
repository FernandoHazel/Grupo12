function [t,x] = pnrz(bits, bitrate, samplerate)
T = length(bits)/bitrate;
n = samplerate/bitrate;
N = n*length(bits);
dt = T/N;
t = 0:dt:T;
x = zeros(1,length(t));
for i = 0:length(bits)-1
  if bits(i+1) == 1
    x(i:i+1) = 1;
  else
    x(i:i+1) = -1;
  end
  i++;
end